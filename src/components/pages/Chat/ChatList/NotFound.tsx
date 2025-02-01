interface INotFound {
  value: string;
  className?: string;
}
const NotFound = ({ value, className }: INotFound) => {
  return (
    <div
      className={`flex flex-col text-center justify-center items-center not-found ${className}`}
    >
      <img width={90} height={90} src="/loupe.png" alt="loupe" />
      <div className="mt-4 max-w-[220px]">
        <p className="text-[16px] break-words tracking-wide leading-5">
          Sorry we couldn&apos;t find any matches for <strong>{value}</strong>
        </p>
        <div className="">
          <span className="text-[11px] text-gray">
            Please try searching with another term
          </span>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
