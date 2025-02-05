import { cn } from '@/lib/utils';

const ProductDetailsHP = ({
  value,
  className,
}: {
  value: number | null;
  className?: string;
}) => {
  if (!value) return <p></p>;
  return (
    <p className={cn('text-2xl', className)}>
      <span className='text-sm font-bold'>HP </span>
      {value}
    </p>
  );
};

export default ProductDetailsHP;
