import { IoChatbox } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";

import { ILogoutIcon, IFolder, ISettings } from "@/types/sidebar";

// import { FaFolder } from "react-icons/fa";
export const sidebarIcons: IFolder[] = [
  {
    id: "0",
    Icon: <IoChatbox />,
    title: "All chats",
    type: "all",
    href: "/c",
    unreaded: 0,
  },
  // {
  //   id: "1",
  //   Icon: <RiInboxUnarchiveLine />,
  //   title: "Archive chats",
  //   type: "archive",
  //   href: "/archive",
  //   unreaded: 0,
  // },
];

export const settings: ISettings[] = [
  {
    Icon: <FaUser />,
    id: "2",
    title: "Profile",
  },
];

export const logOutIcon: ILogoutIcon = {
  Icon: <BiLogOut />,
  title: "Log out",
};
