import {
  InputHTMLAttributes,
  useEffect,
  useState,
  ChangeEvent,
  KeyboardEvent,
  RefObject,
} from "react";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

import Icon from "../Icon";
import Delete from "../Delete";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { cn } from "@/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  value?: string;
  setValue?:
    | React.Dispatch<React.SetStateAction<string>>
    | ActionCreatorWithPayload<string, "search/setSearchInputValue">;
  setDebouncedValue?:
    | React.Dispatch<React.SetStateAction<string>>
    | ActionCreatorWithPayload<string, "search/setDebouncedSearchInputValue">;
  noDeleteIcon?: boolean;
  ref?: RefObject<HTMLInputElement>;
  isDark?: boolean;
  type?: "text" | "email" | "password" | "number" | "search" | "tel" | "url";
}

const Input = ({
  className,
  value,
  setValue,
  setDebouncedValue,
  isDark,
  noDeleteIcon,
  ref,
  type = "text",
  ...props
}: InputProps) => {
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (setDebouncedValue && value != null) {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, 300);
      return () => clearTimeout(handler);
    }
  }, [setDebouncedValue, value]);

  const onBackspaceKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (inputValue.length === 1 && e.key === "Backspace") {
      handleClearInput();
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (setValue) setValue(newValue);
    setInputValue(newValue);
  };

  const handleClearInput = () => {
    setInputValue("");
    if (setValue) setValue("");
    if (setDebouncedValue) setDebouncedValue("");
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
        value={value || inputValue}
        onChange={handleInputChange}
        onKeyDown={onBackspaceKeyDown}
        className={cn(
          `relative focus:shadow-lg text-dark placeholder:text-dark placeholder:text-opacity-60 pr-4 py-2 font-[400] rounded-xl outline-none w-full transition duration-300`,
          inputValue && "outline-white/55",
          className
        )}
        {...props}
      />
      {inputValue && type !== "password" && !noDeleteIcon && (
        <Delete
          isDark={isDark}
          handler={handleClearInput}
          position="center-right"
        />
      )}

      {type === "password" && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-2 top-1/2 -translate-y-1/2 leading-[0.7]"
        >
          <Icon className={"hover:bg-white"}>
            {passwordHidden ? <FaEyeSlash /> : <FaEye />}
          </Icon>
        </button>
      )}
    </div>
  );
};

Input.displayName = "Input";

export default Input;
