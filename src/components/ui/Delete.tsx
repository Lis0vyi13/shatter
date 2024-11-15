import Icon from "./Icon";

import { IoCloseSharp } from "react-icons/io5";

interface IDelete {
  handler: () => void;
  isDark?: boolean;
  position?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "center"
    | "center-left"
    | "center-right";
  className?: string;
}

const positionStyles: { [key: string]: string } = {
  "top-left": "top-2 left-2",
  "top-right": "top-2 right-2",
  "bottom-left": "bottom-2 left-2",
  "bottom-right": "bottom-2 right-2",
  center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  "center-left": "top-1/2 left-2 -translate-y-1/2",
  "center-right": "top-1/2 right-2 -translate-y-1/2",
};

const Delete = ({ handler, isDark, position = "top-right", className = "" }: IDelete) => {
  return (
    <button
      type="button"
      onClick={handler}
      className={`
        absolute ${positionStyles[position]} 
        text-[16px] rounded-full leading-[0.7]
        ${className}
        ${isDark ? "text-white" : "text-dark"}
      `}
    >
      <Icon isDark={isDark}>
        <IoCloseSharp />
      </Icon>
    </button>
  );
};

export default Delete;
