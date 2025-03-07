'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Plus, X } from 'lucide-react';
import { CartItem } from '@/types';
import { toast } from 'sonner';
import { addItemToCart } from '@/lib/actions/cart.actions';

const AddToCart = ({ item }: { item: CartItem }) => {
  const router = useRouter();
  const handleAddToCart = async () => {
    const res = await addItemToCart(item);

    // Handle add cart error

    if (!res.success) {
      toast.error(res.message, {
        richColors: true,
        actionButtonStyle: {
          position: 'absolute',
          top: '0.1rem',
          right: '0.1rem',
          width: '31px',
          height: '31px',
          border: 'none',
          backgroundColor: 'transparent',
          color: '#4b5563',
        },
        action: {
          label: <X />,
          onClick: () => toast.dismiss(),
        },
      });
      return;
    }

    // Handle Sucess add to cart
    toast.success(res.message, {
      duration: 5000,
      actionButtonStyle: {
        padding: '18px 24px',
      },
      action: {
        label: 'View Cart',
        onClick: () => router.push('/cart'),
      },
    });
  };
  return (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      <Plus />
      Add to Cart
    </Button>
  );
};

export default AddToCart;
