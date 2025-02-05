import { Ability } from '@/types';

const ProductDetailsAbilities = ({
  abilities,
}: {
  abilities: Array<Ability>;
}) => {
  if (!abilities || abilities.length === 0) return <></>;
  return (
    <div>
      <p className="details-heading">Abilities</p>
      {abilities.map((ability) => (
        <div key={ability.id}>
          <p className="font-bold text-lg">{ability.name}</p>
          <p>{ability.text}</p>
          <p>{ability.type}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductDetailsAbilities;
