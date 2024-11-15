import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={`w-full transition-all duration-200 px-4 py-2 hover:bg-opacity-80 h-full focus:outline-none focus:opacity-50 inline-block active:scale-90 ${className}`}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

export default Button;
