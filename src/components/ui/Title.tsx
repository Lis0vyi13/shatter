import { cn } from "@/utils";
import { ReactNode } from "react";

interface ITitleProps {
  children: ReactNode;
  lang?: string;
  className?: string;
}

const Title = ({ children, lang, className }: ITitleProps) => {
  const titleClassName = cn("font-[600] line-clamp-1 break-words", className);

  return (
    <h1 lang={lang} className={titleClassName}>
      {children}
    </h1>
  );
};

export default Title;
