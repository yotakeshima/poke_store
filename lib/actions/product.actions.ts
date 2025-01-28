'use server';
import { prisma } from '@/db/prisma';
import { convertToObject } from '../utils';
import { RECENT_LISTING_LIMIT } from '../constants';
import { Product } from '@/types';

// Define reusable relations
const productIncludeRelations = {
  pokemon: {
    include: {
      images: true,
      set: true,
      abilities: true,
      attacks: true,
      weaknesses: true,
    },
  },
};

// Helper function to fetch a product with relations
async function findProductWithRelations(where: object) {
  const product = await prisma.product.findFirst({
    where,
    include: productIncludeRelations,
  });
  return product ? convertToObject(product) : null;
}

// Get latest products
export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    take: RECENT_LISTING_LIMIT,
    orderBy: { createdAt: 'desc' },
    include: productIncludeRelations,
  });
  return convertToObject(data);
}

// Gets a pokemon from the corresponding productId.
export async function getPokemon(productId: string) {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: productIncludeRelations,
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
  return findProductWithRelations({
    OR: [{ id: id ?? undefined }, { pokemonId: pokemonId ?? undefined }],
  });
}
