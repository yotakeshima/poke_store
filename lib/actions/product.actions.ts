'use server';
import { prisma } from '@/db/prisma';
import { convertToObject } from '../utils';
import { RECENT_LISTING_LIMIT } from '../constants';

// Get latest products
export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    take: RECENT_LISTING_LIMIT,
    orderBy: { createdAt: 'desc' },
  });
  //   const transformedData = data.map((product) => ({
  //     ...product,
  //     price: product.price.toString(),
  //   }));
  return convertToObject(data);
}

// Gets a pokemon from the corresponding productId.
export async function getPokemon(productId: string) {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      pokemon: {
        include: {
          images: true,
          set: true,
        },
      },
    },
  });

  if (!product || !product.pokemon) {
    throw new Error('Product or Pokemon data is missing');
  }
  return convertToObject(product?.pokemon);
}
