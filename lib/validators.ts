import { z } from 'zod';
import { formatNumberWithDecimal } from './utils';

const currency = z
  .string()
  .refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
    'Price must have exactly two decimal places'
  );

// Define the schema for Images
export const imagesSchema = z
  .object({
    id: z.string(),
    small: z.string().url(), // Ensure it’s a valid URL
    large: z.string().url(),
  })
  .nullable();

// Define the schema for Set
export const setSchema = z.object({
  id: z.string(),
  name: z.string(),
  series: z.string(),
  printedTotal: z.number().int(), // Integer value
  total: z.number().int(),
  releaseDate: z.date(),
  updatedAt: z.date(),
  imagesId: z.string().nullable(), // Nullable field
  legalitiesId: z.string().nullable(),
});

// Define the schema for Pokémon
export const pokemonSchema = z.object({
  id: z.string(),
  name: z.string(),
  supertype: z.string(),
  subtypes: z.array(z.string()),
  hp: z.number().nullable(), // Nullable integer for HP
  types: z.array(z.string()),
  evolvesFrom: z.string().nullable(), // Nullable string
  retreatCost: z.array(z.string()), // Array of strings
  convertedRetreatCost: z.number(),
  setId: z.string(),
  number: z.string(),
  artist: z.string().nullable(), // Nullable string
  rarity: z.string().nullable(),
  flavorText: z.string().nullable(),
  nationalPokedexNumbers: z.array(z.number()), // Array of numbers
  legalitiesId: z.string().nullable(),
  imagesId: z.string().nullable(),
  tcgplayerId: z.string().nullable(),
  cardmarketId: z.string().nullable(),
  images: imagesSchema, // Related Images schema
  set: setSchema, // Related Set schema
});

// Schema for inserting products
export const insertProductSchema = z.object({
  condition: z.string().min(3, 'Must be at least 3 characters'),
  stock: z.coerce.number(),
  price: currency,
});

export const fullProductSchema = insertProductSchema.extend({
  id: z.string().uuid(),
  pokemonId: z.string(),
  sellerId: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const productWithPokemonSchema = fullProductSchema.extend({
  pokemon: pokemonSchema,
});
