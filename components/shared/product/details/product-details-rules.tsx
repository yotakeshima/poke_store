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

export default ProductDetailsRules;
