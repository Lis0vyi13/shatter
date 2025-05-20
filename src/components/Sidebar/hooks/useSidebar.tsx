import { useEffect, useState } from "react";

import useSidebarItems from "./useSidebarItems";
import useSidebarActions from "./useSidebarActions";

import { IFolder } from "@/types/sidebar";
import useActions from "@/hooks/useActions";
import { useLocation } from "react-router-dom";

const useSidebar = (initialFolders: IFolder[] | null) => {
  const [activeIcon, setActiveIcon] = useState("0");
  const { setActiveChat } = useActions();
  const { pathname } = useLocation();
  const isArchiveChat = pathname.includes("archive");

  useEffect(() => {
    setActiveIcon(isArchiveChat ? "1" : "0");
  }, []);

  const handleClick = (id: string) => {
    setActiveIcon(id);
    setActiveChat("");
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
