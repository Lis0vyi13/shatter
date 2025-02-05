import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { cn } from "@/utils";

import SearchInput from "@/components/ui/Inputs/SearchInput";

import { FaArrowLeftLong } from "react-icons/fa6";

interface ChatSearchProps {
  className: string;
  searchValue: string;
  setSearchInputValue: ActionCreatorWithPayload<
    string,
    "search/setSearchInputValue"
  >;
  setDebouncedSearchInputValue: ActionCreatorWithPayload<
    string,
    "search/setDebouncedSearchInputValue"
  >;
}

const ChatSearch = ({
  className,
  searchValue,
  setSearchInputValue,
  setDebouncedSearchInputValue,
}: ChatSearchProps) => {
  const searchInputProps = {
    name: "search",
    placeholder: "Search...",
    value: searchValue,
    setValue: setSearchInputValue,
    setDebouncedValue: setDebouncedSearchInputValue,
  };

  return (
    <div className={cn("flex items-center gap-2 w-full", className)}>
      <FaArrowLeftLong className="block mdLg:hidden" />
      <SearchInput
        autoComplete="off"
        className="py-[10px] flex-1"
        {...searchInputProps}
      />
    </div>
  );
};

export default ChatSearch;
