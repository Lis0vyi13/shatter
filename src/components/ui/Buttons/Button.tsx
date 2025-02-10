import {
  ButtonHTMLAttributes,
  forwardRef,
  memo,
  ReactNode,
  RefObject,
} from "react";

import { cn } from "@/utils";
import { LoaderCircle } from "lucide-react";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  isLoading?: boolean;
  ref?: RefObject<HTMLButtonElement>;
}

const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  ({ children, isLoading, className, ...rest }: IButtonProps, ref) => {
    return (
      <button
        disabled={isLoading}
        ref={ref}
        className={cn(
          "w-full transition-all duration-300 px-4 py-2 hover:bg-opacity-80 h-full focus:outline-none focus:opacity-50 inline-block active:scale-90 disabled:bg-separator disabled:cursor-not-allowed",
          className,
        )}
        {...rest}
      >
        {!isLoading ? (
          children
        ) : (
          <LoaderCircle size={17} className="animate-spin mx-auto" />
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

export default memo(Button);
