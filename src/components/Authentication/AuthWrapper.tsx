import { ReactNode } from "react";

import { cn } from "@/utils";

import Block from "../ui/Block";

interface IAuthWrapper {
  children: ReactNode;
  className?: string;
}
const AuthWrapper = ({ children, className }: IAuthWrapper) => {
  return (
    <Block
      color="dark"
      className={cn(
        `flex overflow-auto transition-all duration-700 relative flex-col min-w-full items-center text-center text-white w-full`,
        className
      )}
    >
      {children}
    </Block>
  );
};

export default AuthWrapper;
