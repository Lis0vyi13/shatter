"use client";

import { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/redux/app/hooks";

import { formatTimestampToDate, getTimeAgo, getUserStatus } from "@/utils";
import useUser from "@/hooks/useUser";

import Title from "@/components/ui/Title";
import Counter from "@/components/ui/Counter";
import Avatar from "../../Avatar";
import LastMessage from "../../LastMessage";

import { TiPin } from "react-icons/ti";
import { IChat } from "@/types/chat";
import { IUserStatus } from "@/types/user";

interface IChatListItemProps extends IChat {
  isActive: boolean;
  setChat: () => void;
  index: number;
}

const ChatListItem = memo(
  ({
    lastMessage,
    chatType,
    unreadMessages,
    updatedAt,
    isPin,
    id,
    title,
    avatar,
    isActive,
    setChat,
    members,
    index,
  }: IChatListItemProps) => {
    const duration = formatTimestampToDate(updatedAt);
    const pathname = usePathname();
    const user = useUser();
    const [userStatus, setUserStatus] = useState<IUserStatus | null>(null);
    const rootPath = pathname.split("/")[1];
    const isUserChatMember = user?.chats.includes(id) || id === user?.favorites;
    const searchInputDebouncedValue = useAppSelector(
      (store) => store.search.searchInput.debouncedValue
    );
    const animatePosition = searchInputDebouncedValue !== "" ? "-100%" : 0;

    useEffect(() => {
      const fetchUserStatus = async () => {
        const status = await getUserStatus(members[0]);
        setUserStatus(status);
      };
      fetchUserStatus();
    }, [members]);

    const ChatMessageContent = () => (
      <>
        <Avatar
          className="min-h-[48px] max-h-[48px] max-w-[48px] min-w-[48px]"
          avatar={avatar}
          title={title}
        />
        <div className="user-info flex flex-1 flex-col gap-[6px]">
          <Title className="text-[14px] mt-1">{title}</Title>
          {userStatus && !isUserChatMember ? (
            <LastMessage
              className="pt-[1px]"
              data={{
                message: `was ${getTimeAgo(userStatus.updatedAt)}`,
                id,
                chatType,
              }}
            />
          ) : (
            <LastMessage data={{ ...lastMessage, chatType, id }} />
          )}
        </div>
        <ChatStatus />
      </>
    );

    const ChatStatus = () => (
      <div className="flex flex-col items-end gap-1">
        {id && isUserChatMember && (
          <strong className="text-[12px] mt-[7px] font-normal opacity-80">
            {duration}
          </strong>
        )}
        <div className="flex gap-1 items-center">
          {unreadMessages > 0 && <Counter>{unreadMessages}</Counter>}
          {user && isPin.includes(user.uid) && (
            <TiPin className="text-blue text-[20px]" />
          )}
        </div>
      </div>
    );

    return (
      <motion.div
        initial={{ x: animatePosition }}
        animate={{ x: 0 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 40,
          delay: 0.05 * index,
        }}
      >
        {isUserChatMember ? (
          <Link
            href={`/${rootPath}/${id}`}
            onClick={setChat}
            shallow
            prefetch
            className={`chat-list-item flex gap-2 p-2 rounded-xl w-full transition-colors ${
              isActive
                ? "bg-lightBlue"
                : "bg-white hover:bg-blue hover:bg-opacity-15"
            }`}
          >
            <ChatMessageContent />
          </Link>
        ) : (
          <div
            className={`chat-list-item cursor-pointer flex gap-2 p-2 rounded-xl w-full transition-colors ${
              isActive
                ? "bg-lightBlue"
                : "bg-white hover:bg-blue hover:bg-opacity-15"
            }`}
            onClick={setChat}
          >
            <ChatMessageContent />
          </div>
        )}
      </motion.div>
    );
  }
);

ChatListItem.displayName = "ChatListItem";

export default ChatListItem;
