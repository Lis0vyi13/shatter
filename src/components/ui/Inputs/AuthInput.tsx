import { useState, KeyboardEvent } from "react";
import { cn } from "@/utils";

import Input, { InputProps } from "./Input";
import Icon from "../Icon";
import Delete from "../Delete";

import { FaEye, FaEyeSlash } from "react-icons/fa";

export interface AuthInputProps extends InputProps {
  isDark?: boolean;
  noDeleteIcon?: boolean;
}

const AuthInput = ({
  isDark,
  noDeleteIcon,
  type = "text",
  ...props
}: AuthInputProps) => {
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [inputValue, setInputValue] = useState("");

  const onBackspaceKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (inputValue.length === 1 && e.key === "Backspace") {
      handleClearInput();
    }
  };

  const handleClearInput = () => {
    setInputValue("");
  };

  const togglePasswordVisibility = () => {
    setPasswordHidden((prev) => !prev);
  };

  const inputType = type === "password" && !passwordHidden ? "text" : type;

  return (
    <div className="relative w-full">
      <Input
        type={inputType}
        value={inputValue}
        onKeyDown={onBackspaceKeyDown}
        onChange={(e) => setInputValue(e.target.value)}
        className={cn(inputValue && "outline-white/55")}
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
          aria-label={passwordHidden ? "Show password" : "Hide password"}
        >
          <Icon className={"hover:bg-white"}>
            {passwordHidden ? <FaEyeSlash /> : <FaEye />}
          </Icon>
        </button>
      )}
    </div>
  );
};

export default AuthInput;
