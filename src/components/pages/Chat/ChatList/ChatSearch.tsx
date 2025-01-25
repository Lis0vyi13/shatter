import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import SearchInput from "@/components/ui/Inputs/SearchInput";
import { FaArrowLeftLong } from "react-icons/fa6";

interface ChatSearchProps {
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
    <div className="flex items-center gap-2 w-full">
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
