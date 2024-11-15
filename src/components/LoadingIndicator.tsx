interface ILoadingIndicatorProps {
  value: number;
}

const LoadingIndicator = ({ value }: ILoadingIndicatorProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-white">
      <div className="space-y-2 text-gray">
        <p
          className={`transition-transform transform duration-500 ease-out ${
            value <= 34 ? "scale-110 text-white" : "scale-100 text-gray-500"
          }`}
        >
          Verifying user credentials
          <span className={`${value <= 34 ? "ellipsis" : "text-green-500"}`}>
            {value > 34 && " ✔"}
          </span>
        </p>
        <p
          className={`transition-transform transform duration-500 ease-out ${
            value > 34 && value < 67 ? "scale-110 text-white" : "scale-100 text-gray-500"
          }`}
        >
          Authenticating user
          <span className={`${value > 34 && value < 67 ? "ellipsis" : "text-green-500"}`}>
            {value > 67 && " ✔"}
          </span>
        </p>
        <p
          className={`transition-transform transform duration-500 ease-out ${
            value > 67 && value <= 90 ? "scale-110 text-white" : "scale-100 text-gray-500"
          }`}
        >
          Establishing session
          <span className={`${value > 67 && value <= 90 ? "ellipsis" : "text-green-500"}`}>
            {value === 100 && " ✔"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoadingIndicator;
