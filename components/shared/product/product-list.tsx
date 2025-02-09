// import { getPokemon } from '@/lib/actions/product.actions';
import ProductCard from './product-card';
import { Product } from '@/types/';

const ProductList = async ({
  data,
  title,
  limit,
}: {
  data: Product[];
  title?: string;
  limit?: number;
}) => {
  const limitedData = limit ? data.slice(0, limit) : data;
  // const pokemonData = await Promise.all(
  //   limitedData.map((product: Product) => getPokemon(product.id))
  // );

  return (
    <div className="my-10">
      <h2 className="mb-4 h2-bold ml-10">{title}</h2>
      {data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 lg:max-w-[85vw] mx-auto items-center">
          {limitedData.map((product: Product) => (
            <ProductCard
              key={product.id}
              product={product}
              // pokemon={pokemonData[index]}
            />
          ))}
        </div>
      ) : (
        <div>
          <p>No products found</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
