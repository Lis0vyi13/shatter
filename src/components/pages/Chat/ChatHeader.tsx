import { motion } from "framer-motion";

import Icon from "@/components/ui/Icon";
import Title from "@/components/ui/Title";
import ChatTitleSkeleton from "./skeletons/ChatTitle.skeleton";

import { CiSearch } from "react-icons/ci";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoMdMore } from "react-icons/io";

import { IChat } from "@/types/chat";
import { IUser } from "@/types/user";
import { fadeIn } from "@/constants/animations";

interface IChatHeader {
  data: IChat | null;
  user: IUser | null;
  usersOnline: unknown[];
}
const ChatHeader = ({ data, user, usersOnline }: IChatHeader) => (
  <motion.header
    {...fadeIn}
    className="chat-header pb-4 bg-white flex justify-between items-center"
  >
    <div className="flex items-center gap-3">
      <Icon className="block mdLg:hidden">
        <FaArrowLeftLong className=" text-[22px]" />
      </Icon>
      <Title className="text-[28px] leading-8">
        {user && data ? data?.title[user?.uid] : <ChatTitleSkeleton />}
      </Title>
      {data?.chatType === "individual" && data?.members?.length > 2 && (
        <p className="members mt-1 font-[400] text-[13px] text-dark text-opacity-70">
          {data?.members?.length} members, {usersOnline.length} online
        </p>
      )}
    </div>
    <div className="flex gap-1 leading-8 text-dark text-opacity-70 text-[28px] items-center">
      <Icon>
        <CiSearch />
      </Icon>
      <Icon>
        <IoMdMore />
      </Icon>
    </div>
  </motion.header>
);

export default ChatHeader;
