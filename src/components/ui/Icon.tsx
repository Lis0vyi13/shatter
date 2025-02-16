import { ReactNode } from "react";

interface IconProps {
  children: ReactNode;
  isDark?: boolean;
  className?: string;
  onClick?: () => void;
}

const Icon = ({ children, onClick, isDark, className }: IconProps) => {
  return (
    <div
      onClick={onClick}
      className={`relative inline-block cursor-pointer transition-colors hover:bg-opacity-20 p-1 rounded-full ${
        isDark ? "hover:bg-white" : "hover:bg-dark"
      } ${className || ""}`}
    >
      {children}
    </div>
  );
};

export default Icon;
