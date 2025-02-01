import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  type?: "text" | "email" | "password" | "number" | "search" | "tel" | "url";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }: InputProps, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "relative focus:shadow-lg text-dark placeholder:text-dark placeholder:text-opacity-60 pr-4 py-2 font-[400] rounded-xl outline-none w-full transition duration-300",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
