import Link from "next/link";
import Image from "next/image";

import useFolders from "@/hooks/useFolders";
import useSidebar from "./useSidebar";

import CircleLoader from "../ui/CircleLoader";
import SidebarIcon from "./SidebarIcon";
import SkeletonSidebarIcon from "./SkeletonSidebarIcon";

import { logOutIcon, settings } from "@/constants";
import { cn } from "@/utils";

const Sidebar = () => {
  const folders = useFolders();
  const { sidebarItems, handleItemClick, handleLogout, loading } =
    useSidebar(folders);

  return (
    <section className="flex min-w-[92px] overflow-auto custom-scrollbar px-2 flex-col justify-between gap-4 items-center py-4">
      <Link shallow className="mt-1" href={"/c"}>
        <Image priority width={32} height={32} src="/logo.svg" alt="Logo" />
      </Link>
      <div className="flex flex-col gap-3 justify-center">
        <div
          className={cn(
            "sidebar-icons flex flex-col justify-center pt-2",
            sidebarItems.length > 0 ? "gap-1" : "gap-9 mb-2"
          )}
        >
          {sidebarItems.length > 0 ? (
            <>
              {sidebarItems?.map((iconData, i) => (
                <SidebarIcon
                  onClick={() => handleItemClick(iconData.id || "0")}
                  key={i}
                  {...iconData}
                />
              ))}
            </>
          ) : (
            <>
              <SkeletonSidebarIcon />
              <SkeletonSidebarIcon />
              <SkeletonSidebarIcon />
            </>
          )}
        </div>

        <hr className="border-white border-opacity-40 border-1 w-3/5 self-center" />
        <div className="sidebar-icons flex gap-1 flex-col justify-center">
          {settings?.map((iconData, i) => (
            <SidebarIcon
              onClick={() => handleItemClick(iconData.id || "0")}
              key={i}
              {...iconData}
            />
          ))}
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
