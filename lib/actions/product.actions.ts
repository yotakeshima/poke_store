'use server';
import { PrismaClient } from '@prisma/client';
import { convertToObject } from '../utils';
import { RECENT_LISTING_LIMIT } from '../constants';

// Get latest products
const prisma = new PrismaClient();
export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    take: RECENT_LISTING_LIMIT,
    orderBy: { createdAt: 'desc' },
  });
  const transformedData = data.map((product) => ({
    ...product,
    price: product.price.toString(),
  }));
  return convertToObject(transformedData);
}

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
