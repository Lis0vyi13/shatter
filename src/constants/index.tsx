import { IoChatbox } from "react-icons/io5";
import { RiInboxUnarchiveLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { CgOptions } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";

import { ILogoutIcon, IFolder, ISettings } from "@/types/sidebar";

// import { FaFolder } from "react-icons/fa";
export const sidebarIcons: IFolder[] = [
  {
    id: "0",
    Icon: <IoChatbox />,
    title: "All chats",
    type: "all",
    unreaded: 0,
  },
  {
    id: "1",
    Icon: <RiInboxUnarchiveLine />,
    title: "Archive chats",
    type: "archive",
    unreaded: 0,
  },
];

export const settings: ISettings[] = [
  {
    Icon: <FaUser />,
    id: "2",
    title: "Profile",
  },
  {
    Icon: <CgOptions />,
    id: "3",
    title: "Edit",
  },
];

export const logOutIcon: ILogoutIcon = {
  Icon: <BiLogOut />,
  title: "Log out",
};
