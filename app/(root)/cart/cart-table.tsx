'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { startTransition, use, useTransition } from 'react';
import { addItemToCart, removeItemFromCart } from '@/lib/actions/cart.actions';
import { ArrowRight, Loader, Minus, Plus } from 'lucide-react';
import { Cart } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { Cart } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

const CartTable = ({ cart }: { cart?: Cart }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <h1 className="py-4 h2-bold">Shopping Cart</h1>
      {!cart || cart.items.length === 0 ? (
        <div>
          Cart is empty. <Link href={'/'}>Go Shoppping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.items.map((item) => (
                  <TableRow key={item.productId}>
                    <TableCell>
                      <Link
                        href={`/product/${item.pokemonId}`}
                        className="flex items-center"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                        />
                        <span className="px-2">{item.name}</span>
                      </Link>
                    </TableCell>
                    <TableCell className="flex-center pt-8 gap-2">
                      <Button
                        disabled={isPending}
                        variant={'outline'}
                        type="button"
                        onClick={() =>
                          startTransition(async () => {
                            const res = await removeItemFromCart(
                              item.productId
                            );

                            if (!res.success) {
                              toast.error(res.message);
                            }
                          })
                        }
                      >
                        {isPending ? (
                          <Loader className="h-4 w-4 animate-spin" />
                        ) : (
                          <Minus className="h-4 w-4" />
                        )}
                      </Button>
                      <span>{item.qty}</span>
                      <Button
                        disabled={isPending}
                        variant={'outline'}
                        type="button"
                        onClick={() =>
                          startTransition(async () => {
                            const res = await addItemToCart(item);

                            if (!res.success) {
                              toast.error(res.message);
                            }
                          })
                        }
                      >
                        {isPending ? (
                          <Loader className="h-4 w-4 animate-spin" />
                        ) : (
                          <Plus className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="text-right ">${item.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </>
  );
};

export default CartTable;
