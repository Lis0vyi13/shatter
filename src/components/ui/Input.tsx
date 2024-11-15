import { InputHTMLAttributes, useEffect, forwardRef, useState, ChangeEvent } from "react";

import Icon from "./Icon";
import Delete from "./Delete";

import { FaEye, FaEyeSlash } from "react-icons/fa";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setDebouncedValue?: React.Dispatch<React.SetStateAction<string>>;
  noDeleteIcon?: boolean;
  isDark?: boolean;
  type?: "text" | "email" | "password" | "number" | "search" | "tel" | "url";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      value,
      setValue,
      setDebouncedValue,
      isDark,
      noDeleteIcon,
      type = "text",
      ...props
    },
    ref,
  ) => {
    const [passwordHidden, setPasswordHidden] = useState<boolean>(true);

    useEffect(() => {
      if (setDebouncedValue) {
        const handler = setTimeout(() => {
          setDebouncedValue(value);
        }, 300);
        return () => {
          clearTimeout(handler);
        };
      }
    }, [value]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };

    const handleClearInput = () => {
      setValue("");

      if (setDebouncedValue) {
        setDebouncedValue("");
      }
    };

    const togglePasswordVisibility = () => {
      setPasswordHidden((prev) => !prev);
    };

    const inputType = type === "password" && !passwordHidden ? "text" : type;

    return (
      <div className="relative w-full">
        <input
          ref={ref}
          type={inputType}
          value={value}
          onChange={handleInputChange}
          className={`relative focus:shadow-lg text-dark placeholder:text-dark placeholder:text-opacity-60 pr-4 py-2 font-[400] rounded-xl outline-none w-full transition duration-300 ${className}`}
          {...props}
        />
        {value && !noDeleteIcon && (
          <Delete isDark={isDark} handler={handleClearInput} position="center-right" />
        )}
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-2 top-1/2 -translate-y-1/2 leading-[0.7]"
          >
            <Icon className="hover:bg-white">{passwordHidden ? <FaEyeSlash /> : <FaEye />}</Icon>
          </button>
        )}
      </div>
    );
  },
);

export default Input;
