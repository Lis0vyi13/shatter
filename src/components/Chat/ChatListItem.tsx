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
import Avatar from "../Avatar";
import LastMessage from "../LastMessage";

import { TiPin } from "react-icons/ti";
import { IChat } from "@/types/chat";
import { IUserStatus } from "@/types/user";

interface IChatListItemProps extends IChat {
  isActive: boolean;
  hideIndicators?: boolean;
  setChat: () => void;
  index: number;
}

const ChatListItem = memo((props: IChatListItemProps) => {
  const {
    lastMessage,
    chatType,
    unreadedMessages,
    updatedAt,
    isPin,
    id,
    title,
    avatar,
    hideIndicators,
    isActive,
    setChat,
    members,
  } = props;
  const duration = formatTimestampToDate(updatedAt);
  const pathname = usePathname();
  const user = useUser();
  const [userStatus, setUserStatus] = useState<IUserStatus | null>(null);
  const root = pathname.split("/")[1];
  const hasChat = user?.chats.includes(id) || id === user?.favorites;
  const hadAnim = sessionStorage.getItem("chatAnim");
  const searchInputDebouncedValue = useAppSelector(
    (store) => store.search.searchInput.debouncedValue
  );

  const animatePosition =
    searchInputDebouncedValue !== "" || !hadAnim ? "-100%" : 0;

  useEffect(() => {
    if (id) sessionStorage.setItem("chatAnim", "true");
  }, [id]);

  useEffect(() => {
    const fetchUserStatus = async () => {
      const status = await getUserStatus(members[0]);
      setUserStatus(status);
    };
    fetchUserStatus();
  }, [members]);

  return (
    <motion.div
      initial={{ x: animatePosition }}
      animate={{ x: 0 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 40,
        delay: 0.05 * props.index,
      }}
    >
      <Link
        href={`/${root}/${id}`}
        onClick={setChat}
        shallow={true}
        prefetch
        className={`chat-list-item flex transition-colors rounded-xl gap-2 w-full p-2 cursor-pointer ${
          isActive && !hideIndicators
            ? "bg-lightBlue"
            : "bg-white hover:bg-blue hover:bg-opacity-15"
        }`}
      >
        <Avatar
          className="min-h-[48px] max-h-[48px] max-w-[48px] min-w-[48px]"
          avatar={avatar}
          title={title}
        />
        <div className="user-info pt-[2px] flex flex-1 flex-col gap-[6px]">
          <Title className={"text-[14px] mt-1"}>{title}</Title>
          {userStatus && !hasChat ? (
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
        <div className="flex gap-1 justify-end">
          {!hideIndicators && (
            <div className="flex flex-col pt-[1px] gap-1 items-end">
              {id && hasChat && (
                <strong className="text-[12px] mt-[6px] font-normal opacity-80">
                  {duration}
                </strong>
              )}

              <div className="flex justify-center items-center gap-1 pt-[1px]">
                {unreadedMessages > 0 && <Counter>{unreadedMessages}</Counter>}
                {user && isPin.includes(user.uid) && (
                  <TiPin className="text-blue text-[20px]" />
                )}
              </div>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
});

ChatListItem.displayName = "ChatListItem";

export default ChatListItem;
