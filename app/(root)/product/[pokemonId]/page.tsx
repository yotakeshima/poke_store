import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getProductById } from '@/lib/actions/product.actions';
import { notFound } from 'next/navigation';
import { ProductPrice } from '@/components/shared/product/product-price';

const ProductDetailsPage = async (props: {
  params: Promise<{ pokemonId: string }>;
}) => {
  const { pokemonId } = await props.params;

  const product = await getProductById({ pokemonId: pokemonId });
  if (!product) notFound();

  return <>{product?.pokemon.name}</>;
};
export default ProductDetailsPage;
