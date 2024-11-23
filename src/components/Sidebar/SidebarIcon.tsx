import { cloneElement } from "react";
import Link from "next/link";

import { ILogoutIcon, IFolder, IUserEditIcons } from "@/types/sidebar";
import { cn } from "@/utils";

type TSidebarIconProps = (IFolder | IUserEditIcons | ILogoutIcon) & {
  onClick: () => void;
  href?: string;
};

const SidebarIcon = ({
  Icon,
  title,
  href,
  onClick,
  isActive,
}: TSidebarIconProps) => {
  const className = cn(
    "icon transition-all w-full bg-transparent text-white hover:bg-white hover:bg-opacity-10 py-3 rounded-xl text-center flex gap-1 flex-col justify-center items-center transform-gpu",
    isActive ? "text-opacity-100" : "text-opacity-30 hover:text-opacity-100",
    "active:scale-95 active:bg-opacity-20"
  );

  const iconWithClasses = cloneElement(Icon, {
    className: `text-[21px]`,
  });

  return href ? (
    <Link shallow onClick={onClick} href={href || ""} className={className}>
      {iconWithClasses}
      <span className="text-[12px] max-w-[76px]">{title}</span>
    </Link>
  ) : (
    <button onClick={onClick} className={className}>
      {iconWithClasses}
      <span className="text-[12px] max-w-[76px]">{title}</span>
    </button>
  );
};

export default SidebarIcon;
