'use server';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { cookies } from 'next/headers';
import { CartItem } from '@/types';
import { convertToObject, formatErrors, round2 } from '../utils';
import { auth } from '@/auth';
import { prisma } from '@/db/prisma';
import { cartItemSchema, insertCartSchema } from '../validators';
import { revalidatePath } from 'next/cache';
import { getPokemonById, getProductById } from './product.actions';
import { Unbounded } from 'next/font/google';

// Create a calcPrice function that returns the items, total, shipping and tax prices.
const calcPrice = (items: CartItem[]) => {
  const itemsPrice = round2(
      items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0)
    ),
    shippingPrice = round2(itemsPrice > 100 ? 0 : 10),
    taxPrice = round2(itemsPrice * 0.15),
    totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  };
};

export async function addItemToCart(data: CartItem) {
  try {
    const sessionCartId = (await cookies()).get('sessionCartId')?.value;
    if (!sessionCartId) throw new Error('Cart session not found');

    // User id and session
    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;

    const cart = await getMyCart();

    // Parse and validate the data
    const item = cartItemSchema.parse(data);

    // const product = await prisma.product.findFirst({
    //   where: { id: item.productId },
    // });

    const product = await getProductById({ id: item.productId });
    const pokemon = product?.pokemon;
    //Get Pokemon Name
    // const pokemon = await getPokemonById(product?.id);

    if (!product) throw new Error('Product not found');

    // If cart is not present
    if (!cart) {
      // Create a new cart
      const newCart = insertCartSchema.parse({
        userId: userId,
        items: [item],
        sessionCartId: sessionCartId,
        ...calcPrice([item]),
      });

      // Persist cart into DataBase
      await prisma.cart.create({
        data: newCart,
      });

      // Revalidate Page
      revalidatePath(`/product/${product.pokemonId}`);
      return {
        success: true,
        message: `${pokemon?.name} added to cart`,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: formatErrors(error),
    };
  }
}

// Function to get a user's cart with userId or cartSessionId
export async function getMyCart() {
  const sessionCartId = (await cookies()).get('sessionCartId')?.value;
  if (!sessionCartId) throw new Error('Cart session not found');

  // User id and session
  const session = await auth();
  const userId = session?.user?.id ? (session.user.id as string) : undefined;

  const cart = await prisma.cart.findFirst({
    where: userId ? { userId: userId } : { sessionCartId: sessionCartId },
  });

  if (!cart) return undefined;

  return convertToObject({
    ...cart,
    items: cart.items as CartItem[],
    itemsPrice: cart.itemsPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString(),
  });
}
