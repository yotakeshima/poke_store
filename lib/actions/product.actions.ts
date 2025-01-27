'use server';
import { PrismaClient } from '@prisma/client';
import { convertToObject } from '../utils';

// Get latest products
const prisma = new PrismaClient();
export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    take: 4,
    orderBy: { createdAt: 'desc' },
  });

  return convertToObject(data);
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

  return convertToObject(product?.pokemon);
}
