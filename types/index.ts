import { z } from 'zod';
import { productWithPokemonSchema, pokemonSchema } from '@/lib/validators';

export type Product = z.infer<typeof productWithPokemonSchema>;
export type Pokemon = z.infer<typeof pokemonSchema>;
