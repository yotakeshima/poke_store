import { Attack } from '@prisma/client';

const ProductDetailsAttacks = ({ attacks }: { attacks: Array<Attack> }) => {
  if (!attacks || attacks.length === 0) return <></>;
  return (
    <div className='my-3'>
      <p className='details-heading'>Attacks</p>

      {attacks.map((attack) => (
        <span key={attack.id} className='p-5'>
          <div>
            <p className='text-md font-semibold'>{attack.name}:</p>
            <p> {attack.damage}</p>
          </div>

          <p className='p-1'>{attack.text}</p>
        </span>
      ))}
    </div>
  );
};

export default ProductDetailsAttacks;
