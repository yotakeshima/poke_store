import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { getProductById } from '@/lib/actions/product.actions';
import { notFound } from 'next/navigation';
import ProductPrice from '@/components/shared/product/product-price';
import ProductDetailsHP from '@/components/shared/product/details/product-details-hp';
import ProductDetailsAttacks from '@/components/shared/product/details/product-details-attacks';
import ProductDetailsRules from '@/components/shared/product/details/product-details-rules';
import ProductDetailsAbilities from '@/components/shared/product/details/product-details-abilites';
import AddToCart from '@/components/shared/product/add-to-cart';
import { getMyCart } from '@/lib/actions/cart.actions';
import { formatNumberWithDecimal } from '@/lib/utils';

const ProductDetailsPage = async (props: {
  params: Promise<{ pokemonId: string }>;
}) => {
  const { pokemonId } = await props.params;
  const product = await getProductById({ pokemonId: pokemonId });

  if (!product) notFound();
  const {
    pokemon,
    pokemon: { set },
  } = product;

  const cart = await getMyCart();
  return (
    <>
      <section className="product-screen">
        {/* Centered Container */}
        <div className="product-container">
          {/* Left Column: Product Image */}
          <div className="flex-center flex-col">
            <div className="col-span-4 p4 block md:hidden">
              <h1 className="product-name">{pokemon.name} </h1>
              <p className="text-gray-500">
                {pokemon.supertype} | {pokemon.subtypes.join(', ')}
              </p>
              <p className="text-sm text-gray-600">
                {pokemon.number}/{set.total} - {set.name}
              </p>
            </div>

            <div className="w-full max-w-[400px] mt-7">
              <Image
                src={pokemon.images?.large || 'https://placehold.co/400x400'}
                alt={pokemon.name}
                width={800}
                height={800}
                className="product-image"
              />
            </div>
          </div>

          {/* Details Container */}
          <div className="grid md-lg:grid-cols-1 lg:grid-cols-2">
            {/* Pokemon Name Title */}
            <div className="col-span-2 p-4 hidden md:block">
              <h1 className="product-name mb-1">{pokemon.name} </h1>
              <p className="text-gray-500">
                {pokemon.supertype} | {pokemon.subtypes.join(', ')}
              </p>
              <p className="text-sm text-gray-600">
                {pokemon.number}/{set.total} - {set.name}
              </p>
            </div>
            {/* Product Details */}
            <div className="order-2  lg:order-1 align-center flex-col gap-1 p-2">
              <p className="text-gray-700">{pokemon.rarity}</p>
              <ProductDetailsHP value={pokemon.hp} className="my-4" />
              <ProductDetailsAttacks attacks={pokemon.attacks} />
              <ProductDetailsAbilities abilities={pokemon.abilities} />
              <ProductDetailsRules rules={pokemon.rules} />
            </div>

            {/* Checkout Cart */}
            <div className="flex items-start xs-sm:justify-center order-1 lg:order-2 col-span-full md:col-span-2 lg:col-span-1 mt-2">
              <Card className="max-w-[350px] w-full">
                <CardContent className="p-4">
                  <div className="mb-2 flex justify-between">
                    <div>Price</div>
                    <div>
                      <ProductPrice value={Number(product.price)} />
                    </div>
                  </div>
                  <div className="mb-2 flex justify-between">
                    <div>Status</div>
                    {product.stock > 0 ? (
                      <Badge variant={'outline'}>In Stock</Badge>
                    ) : (
                      <Badge variant={'destructive'}>Out of Stock</Badge>
                    )}
                  </div>
                  {product.stock > 0 && (
                    <div className="flex-center">
                      <AddToCart
                        cart={cart}
                        item={{
                          productId: product.id,
                          name: product.pokemon.name,
                          pokemonId: product.pokemonId,
                          qty: 1,
                          image:
                            product.pokemon.images?.small ||
                            'https://placehold.co/300x300',
                          price: formatNumberWithDecimal(Number(product.price)),
                        }}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default ProductDetailsPage;
