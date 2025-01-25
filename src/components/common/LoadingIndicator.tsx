import { cn } from "@/utils";

interface ILoadingIndicatorProps {
  value: number;
}

const steps = [
  { range: [0, 34], label: "Verifying user credentials" },
  { range: [35, 67], label: "Authenticating user" },
  { range: [68, 100], label: "Establishing session" },
];

const LoadingIndicator = ({ value }: ILoadingIndicatorProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-white">
      <div className="space-y-2 text-gray">
        {steps.map((step, index) => {
          const isActive = value > step.range[0] && value <= step.range[1];
          const isCompleted = value > step.range[1];

          const labelClassName = cn(
            "transition-transform transform duration-500 ease-out",
            isActive ? "scale-110 text-white" : "scale-100 text-gray-500"
          );
          return (
            <p key={index} className={labelClassName}>
              {step.label}
              <span className={`${isActive ? "ellipsis" : "text-green-500"}`}>
                {isCompleted && " ✔"}
              </span>
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default LoadingIndicator;
