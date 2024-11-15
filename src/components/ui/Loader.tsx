interface ILoader {
  isDefault?: boolean;
  isVertical?: boolean;
  className?: string;
}

const Loader = ({ isDefault, isVertical, className }: ILoader) => {
  const loaderClass = isDefault ? "flex justify-center items-center mt-10" : "custom-loader";
  const dotClass = isVertical ? "dot vertical" : "dot";

  return (
    <div className={`${loaderClass} ${className}`}>
      <div className={dotClass} />
      <div className={dotClass} />
      <div className={dotClass} />
    </div>
  );
};

export default Loader;
