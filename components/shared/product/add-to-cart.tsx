'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Plus, X, Minus } from 'lucide-react';
import { Cart, CartItem } from '@/types';
import { toast } from 'sonner';
import { addItemToCart, removeItemFromCart } from '@/lib/actions/cart.actions';
// Helper function to show error toast
const showErrorToast = (message: string) => {
  toast.error(message, {
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
};
const AddToCart = ({ cart, item }: { cart?: Cart; item: CartItem }) => {
  const router = useRouter();
  const handleAddToCart = async () => {
    const res = await addItemToCart(item);

    // Handle add cart error

    if (!res.success) {
      showErrorToast(res.message);
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

  // Handle remove from cart
  const handleRemoveFromCart = async () => {
    const res = await removeItemFromCart(item.productId);

    if (!res.success) {
      showErrorToast(res.message);
      return;
    }

    toast.success(res.message);
  };

  // Check if Item is in cart
  const existingItem =
    cart && cart.items.find((x) => x.productId === item.productId);

  return existingItem ? (
    <div>
      <Button type="button" variant={'outline'} onClick={handleRemoveFromCart}>
        <Minus className="h-4 w-4" />
      </Button>
      <span className="px-2">{existingItem.qty}</span>
      <Button type="button" variant={'outline'} onClick={handleAddToCart}>
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  ) : (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      <Plus />
      Add to Cart
    </Button>
  );
};

export default AddToCart;
