'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Plus, X } from 'lucide-react';
import { CartItem } from '@/types';
import { toast } from 'sonner';
import { addItemToCart } from '@/lib/actions/cart.actions';
import { showCustomToast } from '@/components/ui/toaster';

const AddToCart = ({ item }: { item: CartItem }) => {
  const router = useRouter();
  const handleAddToCart = async () => {
    const res = await addItemToCart(item);

    // Handle add cart error

    if (!res.success) {
      //   toast.error(res.message, {
      //     richColors: true,
      //     icon: (
      //       <Button
      //         className="absolute top-2 right-2 text-white hover:text-gray-300"
      //         onClick={() => toast.dismiss()}
      //       >
      //         <X className="w-4 h-4" />
      //       </Button>
      //     ),
      //   });
      showCustomToast('A problem occured', 'Please try again', 'error');
      return;
    }

    // Handle Sucess add to cart
    toast.success(`${item.name} added to cart`, {
      duration: 10000,
      action: {
        label: 'View Cart',
        onClick: () => router.push('/cart'),
      },
      className: 'bg-white text-black border border-gray-500 shadow-lg',
    });
  };
  return (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      Add to Cart
    </Button>
  );
};

export default AddToCart;
