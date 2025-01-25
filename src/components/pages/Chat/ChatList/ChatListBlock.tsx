import { useState } from "react";
import { useParams } from "react-router-dom";

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
    setIsLoading,
    activeChat,
  };

  const wrapperClassName = cn(
    `chat-list-wrapper h-full py-4 hidden mdLg:block w-[min(300px,_100%)]`,
    className
  );

  return (
    <section className={wrapperClassName}>
      <ChatListHeader {...chatListHeaderProps} />
      <ChatList {...chatListProps} className="mt-6" />
    </section>
  );
};

export default ChatListBlock;
