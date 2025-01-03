import { useState } from "react";
import { useParams } from "next/navigation";

import { cn } from "@/utils";
import useActiveChat from "./hooks/useActiveChat";
import useChatList from "./hooks/useChatList";

import ChatListHeader from "./ChatListHeader";
import ChatList from ".";

import { IChat } from "@/types/chat";

interface IChatListBlock {
  data: IChat[] | null;
  className?: string;
}

const ChatListBlock = ({ data, className }: IChatListBlock) => {
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams<{ id: string }>();
  const { activeChat, setActiveChat } = useActiveChat(params?.id);

  const { createNewChatHandler, setActiveChatHandler } = useChatList({
    setIsLoading,
    setActiveChat,
  });

  const chatListHeaderProps = {
    data,
    func: {
      createNewChat: createNewChatHandler,
      setActiveChat: setActiveChatHandler,
    },
  };

  const chatListProps = {
    ...chatListHeaderProps,
    loading: isLoading,
    activeChat,
  };

  return (
    <section
      className={cn(
        `chat-list-wrapper min-w-[300px] h-full py-4 hidden mdLg:block`,
        className
      )}
    >
      <ChatListHeader {...chatListHeaderProps} />
      <ChatList {...chatListProps} className="mt-6" />
    </section>
  );
};

export default ChatListBlock;
