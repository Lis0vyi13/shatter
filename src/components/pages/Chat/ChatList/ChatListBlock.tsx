import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import { cn } from "@/utils";
import useActiveChat from "../../../../hooks/useActiveChat";
import useChatList from "./hooks/useChatList";
import useActions from "@/hooks/useActions";

import ChatListHeader from "./ChatListHeader";
import ChatList from ".";

import { IChat } from "@/types/chat";

interface IChatListBlock {
  data: IChat[] | null;
  className?: string;
}

const ChatListBlock = ({ data, className }: IChatListBlock) => {
  const params = useParams<{ id: string }>();
  const activeChat = useActiveChat();
  const { setActiveChat } = useActions();
  const { createNewChatHandler, setActiveChatHandler } = useChatList();
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (params.id && params.id !== activeChat) {
      setActiveChat(params.id);
    }
  }, [params.id]);

  const chatListHeaderProps = {
    data,
    func: {
      handleCreateNewChat: createNewChatHandler,
      handleSetActiveChat: setActiveChatHandler,
    },
    listRef,
  };

  const chatListProps = {
    ...chatListHeaderProps,
    activeChat,
  };

  const wrapperClassName = cn(`chat-list-wrapper h-full py-4`, className);

  return (
    <section className={wrapperClassName}>
      <ChatListHeader {...chatListHeaderProps} />
      <ChatList {...chatListProps} className="mt-6" />
    </section>
  );
};

export default ChatListBlock;
