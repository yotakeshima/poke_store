'use server';
import { prisma } from '@/db/prisma';
import { convertToObject } from '../utils';
import { RECENT_LISTING_LIMIT } from '../constants';
import { Product } from '@/types';

// Get latest products
export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    take: RECENT_LISTING_LIMIT,
    orderBy: { createdAt: 'desc' },
    include: {
      pokemon: {
        include: {
          images: true,
          set: true,
        },
      },
    },
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

// Gets a product by ID
export async function getProductById({
  id,
  pokemonId,
}: {
  id?: string;
  pokemonId?: string;
}): Promise<Product | null> {
  if (!id && !pokemonId)
    throw new Error('you must provide either a id or pokemonId');
  const product = await prisma.product.findFirst({
    where: {
      OR: [{ id: id ?? undefined }, { pokemonId: pokemonId ?? undefined }],
    },
    include: {
      pokemon: {
        include: {
          images: true,
          set: true,
        },
      },
    },
  });
  return convertToObject(product);
}
