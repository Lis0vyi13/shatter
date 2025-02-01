import {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useEffect,
} from "react";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

import { cn } from "@/utils";

import Input, { InputProps } from "./Input";
import Delete from "../Delete";

import { CiSearch } from "react-icons/ci";
import styles from "./SearchInput.module.css";

interface ISearchInput extends InputProps {
  className?: string;
  setValue:
    | ActionCreatorWithPayload<string, "search/setSearchInputValue">
    | Dispatch<SetStateAction<string>>;
  setDebouncedValue:
    | ActionCreatorWithPayload<string, "search/setDebouncedSearchInputValue">
    | Dispatch<SetStateAction<string>>;
  isDark?: boolean;
}

const SearchInput = ({
  className,
  setValue,
  setDebouncedValue,
  isDark,
  ...props
}: ISearchInput) => {
  useEffect(() => {
    if (typeof props.value === "string" && props.value?.trim()?.length) {
      const handler = setTimeout(() => {
        setDebouncedValue(props.value as string);
      }, 300);
      return () => clearTimeout(handler);
    }
  }, [setDebouncedValue, props.value]);

  const handleClearInput = () => {
    setValue("");
    setDebouncedValue("");
  };

  const onBackspaceKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (
      typeof props.value === "string" &&
      props.value?.length === 1 &&
      e.key === "Backspace"
    ) {
      handleClearInput();
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  return (
    <div className={`relative w-full ${styles.input}`}>
      <Input
        className={cn(
          "pl-[30px] placeholder:text-[12px] text-[12px] bg-lightBlue",
          className,
        )}
        onKeyDown={onBackspaceKeyDown}
        onChange={handleInputChange}
        {...props}
      />
      {props.value != "" && (
        <Delete
          isDark={isDark}
          handler={handleClearInput}
          position="center-right"
        />
      )}
      <CiSearch className="absolute text-[18px] left-2 top-1/2 -translate-y-1/2" />
    </div>
  );
};

export default SearchInput;
