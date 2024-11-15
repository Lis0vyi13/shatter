import { cloneElement } from "react";
import Link from "next/link";

import { ILogoutIcon, IFolder, IUserEditIcons } from "@/types/sidebar";

type TSidebarIconProps = (IFolder | IUserEditIcons | ILogoutIcon) & {
  onClick: () => void;
};

const SidebarIcon = ({
  Icon,
  title,
  href,
  onClick,
  isActive,
}: TSidebarIconProps) => {
  const iconWithClasses = cloneElement(Icon, {
    className: `text-[21px]`,
  });

  return (
    <Link
      onClick={onClick}
      href={href || ""}
      className={`icon transition-all w-full bg-transparent text-white hover:bg-white hover:bg-opacity-10 py-3 rounded-xl
       text-center flex gap-1 flex-col justify-center items-center transform-gpu
       ${
         isActive
           ? "text-opacity-100"
           : "text-opacity-30 hover:text-opacity-100"
       }
       active:scale-95 active:bg-opacity-20`}
    >
      {iconWithClasses}
      <span className="text-[12px] max-w-[76px]">{title}</span>
    </Link>
  );
};

export default SidebarIcon;
