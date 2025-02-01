import { ReactNode } from "react";

interface IBlockProps {
  color?: "white" | "lightBlue" | "dark";
  children: ReactNode;
  className?: string;
}

const Block = ({ color = "white", className, children }: IBlockProps) => {
  const colorClass = `bg-${color}`;

  return (
    <section
      className={`block flex-1 relative w-full h-full rounded-[24px] ${colorClass} ${className}`}
    >
      {children}
    </section>
  );
};

export default Block;
