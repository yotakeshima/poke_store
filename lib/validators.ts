import { array, z } from 'zod';
import { formatNumberWithDecimal } from './utils';
import { PAYMENT_METHODS } from './constants';

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
export const abilitySchema = z.object({
  id: z.string(),
  name: z.string(),
  text: z.string(),
  type: z.string(),
  pokemonId: z.string(),
});

export const attackSchema = z.object({
  id: z.string(),
  name: z.string(),
  cost: z.array(z.string()),
  convertedEnergyCost: z.number(),
  damage: z.string().nullable(),
  text: z.string().nullable(),
  pokemonId: z.string(),
});

export const weaknessSchema = z.object({
  id: z.string(),
  type: z.string(),
  value: z.string(),
  pokemonId: z.string(),
});

// Updated Pokemon Schema
export const pokemonSchema = z.object({
  id: z.string(),
  name: z.string(),
  supertype: z.string(),
  subtypes: z.array(z.string()),
  hp: z.number().nullable(),
  types: z.array(z.string()),
  evolvesFrom: z.string().nullable(),
  retreatCost: z.array(z.string()),
  convertedRetreatCost: z.number(),
  setId: z.string(),
  number: z.string(),
  artist: z.string().nullable(),
  rarity: z.string().nullable(),
  flavorText: z.string().nullable(),
  nationalPokedexNumbers: z.array(z.number()),
  legalitiesId: z.string().nullable(),
  imagesId: z.string().nullable(),
  tcgplayerId: z.string().nullable(),
  cardmarketId: z.string().nullable(),
  rules: z.array(z.string()),
  regulationMark: z.string().nullable(),
  images: imagesSchema,
  set: setSchema,
  abilities: z.array(abilitySchema),
  attacks: z.array(attackSchema),
  weaknesses: z.array(weaknessSchema),
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

//Schema for signing users in

export const signInFormSchema = z.object({
  email: z.string().email('Invalid email addresss'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

//Schema for signingup

export const signUpFormSchema = z
  .object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    email: z.string().email('Invalid email addresss'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z
      .string()
      .min(6, 'Confirm password must be at least 6 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

//  Cart Schemas

export const cartItemSchema = z.object({
  productId: z.string().min(1, 'Product is required'),
  name: z.string().min(1, 'Name is required'),
  pokemonId: z.string().min(1, 'PokemonId is required'),
  qty: z.number().int().nonnegative('Quantity must be a positive number'),
  image: z.string().min(1, 'Image is required'),
  price: currency,
});

export const insertCartSchema = z.object({
  items: array(cartItemSchema),
  itemsPrice: currency,
  totalPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  sessionCartId: z.string().min(1, 'Session Cart Id is required'),
  userId: z.string().optional().nullable(),
});

export const shippingAddressSchema = z.object({
  fullName: z.string().min(3, 'Name must be at least 3 characters'),
  streetAddress: z.string().min(3, 'Address must be at least 3 characters'),
  city: z.string().min(3, 'City must be at least 3 characters'),
  state: z.string().min(3, 'State must be selected'),
  postalCode: z.string().min(3, 'Postal code must be at least 5 characters'),
  country: z.string().min(3, 'Country must be at least 3 characters'),
  lat: z.number().optional(),
  lng: z.number().optional(),
});

// Payment Method Schema

export const paymentMethodSchema = z
  .object({
    type: z.string().min(1, 'Payment Method is required'),
  })
  .refine((data) => PAYMENT_METHODS.includes(data.type), {
    path: ['type'],
    message: 'Invalid payment method',
  });

// Inserting order schema

export const insertOrderSchema = z.object({
  userId: z.string().min(1, 'User is required'),
  itemsPrice: currency,
  totalPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  paymentMethod: z.string().refine((data) => PAYMENT_METHODS.includes(data), {
    message: 'Invalid payment method',
  }),
  shippingAddress: shippingAddressSchema,
});

// Schema for inserting an order item

export const insertOrderItemSchema = z.object({
  productId: z.string(),
  pokemonId: z.string(),
  image: z.string(),
  name: z.string(),
  price: currency,
  qty: z.number(),
});

// payment result schema

export const paymentResultSchema = z.object({
  id: z.string(),
  status: z.string(),
  email_address: z.string(),
  pricePaid: z.string(),
});

// Schema for updating the user profile

export const updateProfileSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().min(3, 'Email must be at least 3 characters'),
});
