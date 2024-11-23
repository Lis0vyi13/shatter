"use client";

import { memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { formatTimestamp } from "@/utils";

import Title from "@/components/ui/Title";
import Counter from "@/components/ui/Counter";
import Avatar from "../Avatar";
import LastMessage from "../LastMessage";

import { TiPin } from "react-icons/ti";
import { IChat } from "@/types/chat";

interface IChatListItemProps extends IChat {
  isActive: boolean;
  hideIndicators?: boolean;
  setChat: () => void;
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
  } = props;
  const duration = formatTimestamp(updatedAt);
  const pathname = usePathname();

  const root = pathname.split("/")[1];
  return (
    <Link
      href={`/${root}/${id}`}
      onClick={() => setChat()}
      shallow
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
        <LastMessage data={{ ...lastMessage, chatType, id }} />
      </div>
      <div className="flex gap-1 justify-end">
        {!hideIndicators && (
          <div className="flex flex-col pt-[1px] gap-1 items-end">
            {id && (
              <strong className="text-[12px] mt-[6px] font-normal opacity-80">
                {duration}
              </strong>
            )}

            <div className="flex justify-center items-center gap-1 pt-[1px]">
              {unreadedMessages > 0 && <Counter>{unreadedMessages}</Counter>}
              {isPin && <TiPin className="text-blue text-[20px]" />}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
});

ChatListItem.displayName = "ChatListItem";

export default ChatListItem;
