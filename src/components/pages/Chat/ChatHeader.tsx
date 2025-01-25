import Icon from "@/components/ui/Icon";
import Title from "@/components/ui/Title";

import { CiSearch } from "react-icons/ci";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoMdMore } from "react-icons/io";
import { IoCallOutline } from "react-icons/io5";
import { IChat } from "@/types/chat";
import { IUser } from "@/types/user";

interface IChatHeader {
  data: IChat;
  user: IUser | null;
  usersOnline: unknown[];
}
const ChatHeader = ({ data, user, usersOnline }: IChatHeader) => (
  <header className="chat-header pb-4 bg-white flex justify-between items-center">
    <div className="flex items-center gap-3">
      <Icon>
        <FaArrowLeftLong className="block mdLg:hidden text-[22px]" />
      </Icon>
      <Title className="text-[28px] leading-8">
        {user && data?.title[user?.uid]}
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
      {data?.chatType === "individual" && data?.members?.length === 2 && (
        <Icon>
          <IoCallOutline />
        </Icon>
      )}
      <Icon>
        <IoMdMore />
      </Icon>
    </div>
  </header>
);

export default ChatHeader;
