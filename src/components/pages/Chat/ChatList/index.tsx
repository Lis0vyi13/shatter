import { useEffect } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { useAppSelector } from "@/redux/app/hooks";

import { cn, scrollToChatLink } from "@/utils";
import useUser from "@/hooks/useUser";
import useFetchUsersChat from "./hooks/useFetchUsersChat";
import useActions from "@/hooks/useActions";
import { useDragDropHandler } from "./hooks/useDragDropHandler";

import ChatListItems from "./ChatListItems";
import ChatSearch from "./ChatSearch";

import { IChat } from "@/types/chat";
import { IUser } from "@/types/user";

interface IChatList {
  data: IChat[] | null;
  activeChat: string;
  func: {
    handleCreateNewChat: (chatData: IChat) => Promise<void>;
    handleSetActiveChat: (id: string) => void;
  };
  className?: string;
  listRef: React.MutableRefObject<HTMLDivElement | null>;
}

const ChatList = ({
  data,
  activeChat,
  func,
  className,
  listRef,
}: IChatList) => {
  const currentUser = useUser();

  const searchValue = useAppSelector((store) => store.search.searchInput.value);
  const debouncedSearchValue = useAppSelector(
    (store) => store.search.searchInput.debouncedValue
  );
  const { setSearchInputValue, setDebouncedSearchInputValue } = useActions();

  // chats that includes user chats OR chats by query
  const { currentChats, setCurrentChats } = useFetchUsersChat(
    data,
    debouncedSearchValue
  );

  const { onDragEnd } = useDragDropHandler(
    currentUser as IUser,
    setCurrentChats
  );

  useEffect(() => {
    listRef.current?.scrollTo(0, 0);
  }, [searchValue]);

  useEffect(() => {
    scrollToChatLink(listRef, activeChat);
  }, [currentChats]);

  return (
    <section
      className={cn(
        "chat-list relative user-list flex flex-col custom-scrollbar h-full",
        className
      )}
    >
      <ChatSearch
        searchValue={searchValue}
        setSearchInputValue={setSearchInputValue}
        setDebouncedSearchInputValue={setDebouncedSearchInputValue}
      />
      <div
        ref={listRef}
        style={{ maxHeight: "calc(100% - 90px)" }}
        className={`mt-2 transition-all duration-0 -ml-2 overflow-auto custom-scrollbar chat-scrollbar`}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <ChatListItems
            chats={currentChats}
            listRef={listRef}
            activeChat={activeChat}
            handleCreateNewChat={func.handleCreateNewChat}
            handleSetActiveChat={func.handleSetActiveChat}
          />
        </DragDropContext>
      </div>
    </section>
  );
};

export default ChatList;
