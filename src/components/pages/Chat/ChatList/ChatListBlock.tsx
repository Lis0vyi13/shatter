import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "@/redux/app/hooks";

import { cn } from "@/utils";
import useActiveChat from "../../../../hooks/useActiveChat";
import useChatList from "./hooks/useChatList";
import useActions from "@/hooks/useActions";
import useUsersOnline from "./UsersOnline/hooks/useUsersOnline";

import ChatListHeader from "./ChatListHeader";
import ChatSearch from "./ChatSearch";
import ChatList from ".";

import { IChat } from "@/types/chat";

interface IChatListBlock {
  data: IChat[] | null;
  className?: string;
}

const ChatListBlock = ({ data, className }: IChatListBlock) => {
  const params = useParams<{ id: string }>();
  const activeChat = useActiveChat();
  const { setActiveChat, setSearchInputValue, setDebouncedSearchInputValue } =
    useActions();
  const { createNewChatHandler, setActiveChatHandler } = useChatList();
  const listRef = useRef<HTMLDivElement | null>(null);
  const [usersOnline] = useUsersOnline(data);
  const searchValue = useAppSelector((store) => store.search.searchInput.value);

  useEffect(() => {
    if (params.id && params.id !== activeChat) {
      setActiveChat(params.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  useEffect(() => {
    listRef.current?.scrollTo(0, 0);
  }, [searchValue]);

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

  const wrapperClassName = cn(
    `chat-list-wrapper flex flex-col h-full pt-4`,
    className,
  );

  return (
    <section className={wrapperClassName}>
      <ChatListHeader {...chatListHeaderProps} />
      <ChatSearch
        searchValue={searchValue}
        setSearchInputValue={setSearchInputValue}
        setDebouncedSearchInputValue={setDebouncedSearchInputValue}
        className={usersOnline && usersOnline.length > 0 ? "mt-2" : "mt-3"}
      />
      <ChatList {...chatListProps} />
    </section>
  );
};

export default ChatListBlock;
