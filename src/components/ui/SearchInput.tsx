import { Dispatch, SetStateAction } from "react";
import Input, { InputProps } from "./Input";
import { CiSearch } from "react-icons/ci";

interface ISearchInput extends InputProps {
  className?: string;
  onInputFocus?: Dispatch<SetStateAction<boolean>>;
}

const SearchInput = ({ className, onInputFocus, ...props }: ISearchInput) => {
  return (
    <div
      onFocus={onInputFocus ? () => onInputFocus(true) : undefined}
      onBlur={onInputFocus ? () => onInputFocus(false) : undefined}
      className="relative"
    >
      <Input
        {...props}
        className={`pl-[30px] placeholder:text-[12px] text-[12px] bg-lightBlue ${className}`}
      />
      <CiSearch className="absolute text-[18px] left-2 top-1/2 -translate-y-1/2" />
    </div>
  );
};

export default SearchInput;
