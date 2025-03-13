import { cn } from '@/lib/utils';
import { Ability } from '@/types';
import { Attack } from '@prisma/client';

const ProductDetailsHp = ({
  value,
  className,
}: {
  value: number | null;
  className?: string;
}) => {
  if (!value) return <p></p>;
  return (
    <p className={cn('text-2xl', className)}>
      <span className="text-sm font-bold">HP </span>
      {value}
    </p>
  );
};

const ProductDetailsRules = ({ rules }: { rules: Array<string> }) => {
  if (!rules || rules.length === 0) return <></>;

  return (
    <div>
      <p className="details-heading">Rules</p>
      {rules.map((rule, index) => (
        <div key={index}>
          <p className="p-1">{rule}</p>
        </div>
      ))}
    </div>
  );
};

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
        <div key={ability.id} className="p-4 -mt-4">
          <p className="text-lg font-bold">{ability.name}:</p>
          <p>{ability.text}</p>
        </div>
      ))}
    </div>
  );
};

const ProductDetailsAttacks = ({ attacks }: { attacks: Array<Attack> }) => {
  if (!attacks || attacks.length === 0) return <></>;

  return (
    <div>
      <p className="details-heading">Attacks</p>
      {attacks.map((attack) => (
        <div key={attack.id} className="p-4 -mt-4">
          <p className="text-lg font-bold">{attack.name}:</p>
          <p>{attack.text}</p>
        </div>
      ))}
    </div>
  );
};

export {
  ProductDetailsHp,
  ProductDetailsRules,
  ProductDetailsAbilities,
  ProductDetailsAttacks,
};
