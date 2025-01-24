'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';
import { useEffect, useState } from 'react';
import ProductPrice from './product-price';

const ProductCard = ({ product }: { product: any }) => {
  const [cardImage, setCardImage] = useState<string>('/placeholder.png');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const card = await PokemonTCG.findCardByID('xy7-54');
        setCardImage(card.images.large); // Set it to a variable or use it here
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="p-0 items-center">
        <Link href={`/product/${product.slug}`}>
          <Image
            src={cardImage}
            alt={product.name}
            height={300}
            width={300}
            priority={true}
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4 grid gap-4">
        <div className="text-xs">{product.brand}</div>
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-md font-medium">{product.name}</h2>
        </Link>
        <div className="flex-between gap-4">
          <p>{product.rating} Stars</p>
          {product.stock > 0 ? (
            <ProductPrice value={Number(product.price)} />
          ) : (
            <p className="text-destructive">Out of Stock</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
