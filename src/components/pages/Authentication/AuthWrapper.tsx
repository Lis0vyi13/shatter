import { ReactNode } from "react";

import { cn } from "@/utils";

import Block from "@/components/ui/Block";

interface IAuthWrapper {
  children: ReactNode;
  className?: string;
}
const AuthWrapper = ({ children, className }: IAuthWrapper) => {
  const blockClassName = cn(
    `flex overflow-auto transition-all duration-700 relative flex-col min-w-full items-center text-center text-white w-full`,
    className,
  );
  return (
    <Block color="dark" className={blockClassName}>
      {children}
    </Block>
  );
};

export default AuthWrapper;
