import { getProductById } from '@/lib/actions/product.actions';
import { notFound } from 'next/navigation';

const ProductDetailsPage = async (props: {
  params: Promise<{ pokemonId: string }>;
}) => {
  const { pokemonId } = await props.params;

  const product = await getProductById({ pokemonId: pokemonId });
  return <>{product?.pokemon.name}</>;
};
export default ProductDetailsPage;
