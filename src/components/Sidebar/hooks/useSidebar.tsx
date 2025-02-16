import { useState } from "react";

import useSidebarItems from "./useSidebarItems";
import useSidebarActions from "./useSidebarActions";

import { IFolder } from "@/types/sidebar";

const useSidebar = (initialFolders: IFolder[] | null) => {
  const [activeIcon, setActiveIcon] = useState("0");

  const handleClick = (id: string) => {
    setActiveIcon(id);
  };

  const { sidebarItems } = useSidebarItems(initialFolders);
  const { handleLogoClick, handleLogout, loading } = useSidebarActions();

  return {
    sidebarItems,
    handleLogoClick,
    handleLogout,
    loading,
    activeIcon,
    handleClick,
  };
};

export default useSidebar;
