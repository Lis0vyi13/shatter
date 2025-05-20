import { motion } from "framer-motion";
import Icon from "@/components/ui/Icon";
import Title from "@/components/ui/Title";
import ChatTitleSkeleton from "./skeletons/ChatTitle.skeleton";

import { FaArrowLeftLong } from "react-icons/fa6";
import { IoMdMore } from "react-icons/io";
import { TiPin } from "react-icons/ti";
import { MdOutlineCleaningServices, MdDeleteOutline } from "react-icons/md";

import { IChat } from "@/types/chat";
import { IUser } from "@/types/user";
import { fadeIn } from "@/constants/animations";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { useChatActions } from "@/components/ui/Menus/useChatActions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/utils";
import { clearChatHistory } from "@/services/chat";
import { getUserById } from "@/services/user";

interface IMenuItem {
  icon: ReactNode;
  label: string;
  action: () => void;
  isDanger?: boolean;
  separator?: boolean;
}

interface IChatHeader {
  data: IChat | null;
  user: IUser | null;
  usersOnline: unknown[];
  onDelete?: () => void;
}

const ChatHeader = ({
  data,
  user,
  usersOnline,
  onDelete = () => {},
}: IChatHeader) => {
  if (!data) return null;
  const { doTogglePinChat, doDeleteChat } = useChatActions();
  const [participant, setParticipant] = useState<IUser | null>(null);

  const participantId = useMemo(
    () => Object.keys(data.members).find((id) => id != user?.uid),
    [data.members],
  );

  const title =
    data.members && Object.keys(data.members).length === 1
      ? data?.title[user?.uid!]
      : participant?.displayName;

  useEffect(() => {
    const getUser = async () => {
      if (!data) return;

      if (!participantId) return;
      const participant = await getUserById(participantId);
      setParticipant(participant);
    };
    getUser();
  }, [participantId]);

  const menuItems: IMenuItem[] = [
    {
      icon: <TiPin className="text-[16px]" />,
      label: user && data.isPin?.includes(user.uid) ? "Unpin" : "Pin",
      action: () => doTogglePinChat(data.id),
      separator: true,
    },
    {
      icon: <MdOutlineCleaningServices className="text-[16px]" />,
      label: "Clear history",
      action: () => clearChatHistory(data.id),
      separator: Object.keys(data.members).length !== 1,
    },
  ];

  if (Object.keys(data.members).length !== 1) {
    menuItems.push({
      icon: <MdDeleteOutline className="text-[16px] text-[#ee242b]" />,
      label: "Delete chat",
      action: () => doDeleteChat(data.id, Object.keys(data.members), onDelete),
      isDanger: true,
    });
  }

  return (
    <motion.header
      {...fadeIn}
      className="chat-header pb-4 bg-white flex justify-between items-center"
    >
      <div className="flex items-center gap-3">
        <Icon className="block mdLg:hidden">
          <FaArrowLeftLong className=" text-[22px]" />
        </Icon>
        <Title className="text-[28px] leading-8">
          {title || <ChatTitleSkeleton />}
        </Title>

        {data?.chatType === "individual" &&
          Object.keys(data?.members).length > 2 && (
            <p className="members mt-1 font-[400] text-[13px] text-dark text-opacity-70">
              {data?.members?.length} members, {usersOnline.length} online
            </p>
          )}
      </div>
      <div className="flex gap-1 leading-8 text-dark text-opacity-70 text-[28px] items-center">
        <DropdownMenu dir="ltr">
          <DropdownMenuTrigger className="outline-none border-none">
            <Icon>
              <IoMdMore />
            </Icon>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[160px] border-none outline-none">
            {menuItems.map(
              ({ icon, label, action, separator, isDanger }, index) => (
                <div key={index}>
                  <DropdownMenuItem
                    onClick={action}
                    className={cn(
                      isDanger ? "text-red-500" : "",
                      "cursor-pointer",
                    )}
                  >
                    <div className="flex items-center">
                      {icon}
                      <p className={`ml-2 ${isDanger ? "text-red-500" : ""}`}>
                        {label}
                      </p>
                    </div>
                  </DropdownMenuItem>
                  {separator && <DropdownMenuSeparator />}
                </div>
              ),
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.header>
  );
};

export default ChatHeader;
