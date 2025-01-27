import { z } from 'zod';
import { fullProductSchema, pokemonSchema } from '@/lib/validators';

export type Product = z.infer<typeof fullProductSchema>;
export type Pokemon = z.infer<typeof pokemonSchema>;
