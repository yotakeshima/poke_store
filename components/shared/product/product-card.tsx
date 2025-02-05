'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import ProductPrice from './product-price';
import { Product } from '@/types';

const ProductCard = ({
  product,
}: // pokemon,
{
  product: Product;
  // pokemon: Pokemon;
}) => {
  return (
    <Card className='w-full max-w-sm'>
      <CardHeader className='p-0 items-center'>
        <Link href={`/product/${product.pokemonId}`}>
          <Image
            src={
              product.pokemon.images?.large || 'https://placehold.co/300x300'
            }
            alt={product.pokemon.name}
            height={300}
            width={300}
            priority={true}
          />
        </Link>
      </CardHeader>
      <CardContent className='p-4 grid gap-1'>
        <div className='text-xs'>{product.pokemon.set.name}</div>
        <Link href={`/product/${product.pokemon.name}`}>
          <h2 className='text-lg font-bold'>{product.pokemon.name}</h2>
        </Link>
        <div className='flex-between gap-2'>
          <p className='text-sm'>{product.condition} Condition</p>
          {product.stock > 0 ? (
            <ProductPrice value={Number(product.price)} />
          ) : (
            <p className='text-destructive'>Out of Stock</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
