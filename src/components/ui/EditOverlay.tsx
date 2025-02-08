import { MouseEventHandler, ReactNode, useState } from "react";

import { cn } from "@/utils";

import { Edit } from "lucide-react";

interface IEditOverlay {
  onClick?: MouseEventHandler<HTMLDivElement>;
  children: ReactNode;
  className?: string;
  isRounded?: boolean;
}

const EditOverlay = ({
  onClick,
  children,
  className,
  isRounded,
}: IEditOverlay) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={cn(
        "relative overflow-hidden w-full h-full",
        isRounded && "rounded-full",
        className,
      )}
      onClick={onClick}
    >
      <div
        className={cn(
          "transition-all absolute inset-0 bg-[#000]",
          isRounded && "rounded-full",
          isHover ? "bg-opacity-60" : "bg-opacity-0",
        )}
      />
      <label
        htmlFor="imgInput"
        className={cn(
          "absolute cursor-pointer inset-0 z-10",
          isRounded && "rounded-full",
        )}
      >
        <input id="imgInput" className="hidden" type="file" accept="image/*" />
      </label>
      {children}

      <Edit
        size={22}
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all",
          isHover ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
};

export default EditOverlay;
