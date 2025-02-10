import React from "react";
import PhoneInput, { CountryData } from "react-phone-input-2";

interface IPhoneInput {
  value: string | null | undefined;
  onChange: (
    value: string,
    data: CountryData | object,
    event: React.ChangeEvent<HTMLInputElement>,
    formattedValue: string,
  ) => void;
}

const CustomPhoneInput = ({ value, onChange }: IPhoneInput) => {
  return (
    <PhoneInput
      country={"ua"}
      value={value}
      inputClass="w-full placeholder:text-gray rounded-xl outline outline-separator text-left transition-all border-none bg-transparent placeholder:text-white text-white px-2 py-2 text-[12px] focus:rounded-xl focus:outline-none focus:outline-gray"
      onChange={onChange}
      specialLabel=""
      enableAreaCodes
      placeholder="+380 (99) 999 99 99"
      containerClass="rounded-xl"
    />
  );
};

export default CustomPhoneInput;
