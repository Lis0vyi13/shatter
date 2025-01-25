import { ReactNode } from "react";

interface ICounterProps {
  children: ReactNode;
}

const Counter = ({ children }: ICounterProps) => {
  return (
    <div className="w-[18px] h-[18px] text-white bg-orange rounded-full flex justify-center items-center">
      <span className="text-[12px] leading-[2] text-center">{children}</span>
    </div>
  );
};

export default Counter;
