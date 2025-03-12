import { z } from 'zod';
import {
  productWithPokemonSchema,
  pokemonSchema,
  abilitySchema,
  attackSchema,
  weaknessSchema,
  insertCartSchema,
  cartItemSchema,
  shippingAddressSchema,
} from '@/lib/validators';

export type Ability = z.infer<typeof abilitySchema>;
export type Attack = z.infer<typeof attackSchema>;
export type Weakness = z.infer<typeof weaknessSchema>;
export type Product = z.infer<typeof productWithPokemonSchema>;
export type Pokemon = z.infer<typeof pokemonSchema>;
export type Cart = z.infer<typeof insertCartSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
export type ShippingAddress = z.infer<typeof shippingAddressSchema>;
