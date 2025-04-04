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
  insertOrderSchema,
  insertOrderItemSchema,
  paymentResultSchema,
} from '@/lib/validators';

export type Ability = z.infer<typeof abilitySchema>;
export type Attack = z.infer<typeof attackSchema>;
export type Weakness = z.infer<typeof weaknessSchema>;
export type Product = z.infer<typeof productWithPokemonSchema>;
export type Pokemon = z.infer<typeof pokemonSchema>;
export type Cart = z.infer<typeof insertCartSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
export type ShippingAddress = z.infer<typeof shippingAddressSchema>;
export type OrderItem = z.infer<typeof insertOrderItemSchema>;
export type Order = z.infer<typeof insertOrderSchema> & {
  id: string;
  createdAt: Date;
  isPaid: boolean;
  paidAt: Date | null;
  isDelivered: boolean;
  deliveredAt: Date | null;
  orderItems: OrderItem[];
  user: { name: string; email: string };
};
export type PaymentResult = z.infer<typeof paymentResultSchema>;
