import { Link } from "react-router-dom";

import { cn } from "@/utils";
import useFolders from "@/hooks/useFolders";
import useSidebar from "./hooks/useSidebar";

import CircleLoader from "../ui/CircleLoader";
import EditProfileDialog from "../ui/Dialogs/EditProfileDialog";
import SidebarIcon from "./SidebarIcon";
import SkeletonSidebarIcon from "./SidebarIcon.skeleton";
import Logo from "../common/Logo";

import { logOutIcon, settings } from "@/constants";

const Sidebar = () => {
  const folders = useFolders();
  const {
    sidebarItems,
    handleItemClick,
    handleLogoClick,
    handleLogout,
    loading,
  } = useSidebar(folders);

  const sidebarIconsListClassName = cn(
    "sidebar-icons flex flex-col justify-center pt-2",
    sidebarItems.length > 0 ? "gap-1" : "gap-9 mb-2",
  );
  return (
    <section className="flex flex-1 min-w-[92px] overflow-auto custom-scrollbar px-2 flex-col justify-between gap-4 items-center py-4">
      <Link
        onClick={handleLogoClick}
        className="mt-1 transition-all duration-300 hover:scale-110 active:scale-90"
        to="/c"
      >
        <Logo width={32} height={32} />
      </Link>
      <div className="flex flex-col gap-3 justify-center">
        <ul className={sidebarIconsListClassName}>
          {sidebarItems.length > 0 ? (
            <li>
              {sidebarItems?.map((iconData, i) => (
                <SidebarIcon
                  onClick={() => handleItemClick(iconData.id || "0")}
                  key={i}
                  {...iconData}
                />
              ))}
            </li>
          ) : (
            <>
              {Array.from({ length: 3 }).map((_, index) => (
                <SkeletonSidebarIcon key={index} />
              ))}
            </>
          )}
        </ul>

        <hr className="border-white border-opacity-40 border-1 w-3/5 self-center" />
        <div className="sidebar-icons flex gap-1 flex-col justify-center">
          {settings?.map((iconData, i) =>
            iconData.title === "Profile" ? (
              <EditProfileDialog key={i}>
                <SidebarIcon
                  onClick={() => handleItemClick(iconData.id || "0")}
                  key={i}
                  {...iconData}
                />
              </EditProfileDialog>
            ) : (
              <SidebarIcon
                onClick={() => handleItemClick(iconData.id || "0")}
                key={i}
                {...iconData}
              />
            ),
          )}
        </div>
      </div>
      <div className={`w-full`}>
        {loading ? (
          <SidebarIcon
            onClick={handleLogout}
            {...logOutIcon}
            Icon={<CircleLoader className="-mt-2" />}
          />
        ) : (
          <SidebarIcon onClick={handleLogout} {...logOutIcon} />
        )}
      </div>
    </section>
  );
};

export default Sidebar;
