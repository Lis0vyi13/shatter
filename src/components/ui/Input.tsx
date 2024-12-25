import {
  InputHTMLAttributes,
  useEffect,
  forwardRef,
  useState,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Icon from "./Icon";
import Delete from "./Delete";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

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
    ref
  ) => {
    const [passwordHidden, setPasswordHidden] = useState(true);
    const [inputValue, setInputValue] = useState("");
    const [isAutoCompleted, setIsAutoCompleted] = useState(false);

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

    function checkIsAutoCompleted(e: React.ChangeEvent<HTMLInputElement>) {
      const target = e.target as HTMLInputElement;
      const computedStyle = getComputedStyle(target);
      setIsAutoCompleted(
        computedStyle.backgroundColor === "rgb(232, 240, 254)"
      );
    }

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
          onInput={checkIsAutoCompleted}
          onChange={handleInputChange}
          onKeyDown={onBackspaceKeyDown}
          className={`relative focus:shadow-lg text-dark placeholder:text-dark placeholder:text-opacity-60 pr-4 py-2 font-[400] rounded-xl outline-none w-full transition duration-300 ${
            inputValue ? "outline-white/55" : ""
          } ${className}`}
          {...props}
        />
        {inputValue && !noDeleteIcon && !isAutoCompleted && (
          <Delete
            isDark={isDark}
            handler={handleClearInput}
            position="center-right"
          />
        )}

        {type === "password" && !isAutoCompleted && (
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
  }
);

Input.displayName = "Input";

export default Input;
