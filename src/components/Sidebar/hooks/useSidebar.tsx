import useSidebarItems from "./useSidebarItems";
import useSidebarActions from "./useSidebarActions";

import { IFolder } from "@/types/sidebar";

const useSidebar = (initialFolders: IFolder[] | null) => {
  const { sidebarItems, setSidebarItems } = useSidebarItems(initialFolders);
  const { handleItemClick, handleLogoClick, handleLogout, loading } =
    useSidebarActions(setSidebarItems);

  return {
    sidebarItems,
    handleItemClick,
    handleLogoClick,
    handleLogout,
    loading,
  };
};

export default useSidebar;
