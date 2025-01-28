import { z } from 'zod';
import {
  productWithPokemonSchema,
  pokemonSchema,
  abilitySchema,
  attackSchema,
  weaknessSchema,
} from '@/lib/validators';

export type Ability = z.infer<typeof abilitySchema>;
export type Attack = z.infer<typeof attackSchema>;
export type Weakness = z.infer<typeof weaknessSchema>;
export type Product = z.infer<typeof productWithPokemonSchema>;
export type Pokemon = z.infer<typeof pokemonSchema>;
