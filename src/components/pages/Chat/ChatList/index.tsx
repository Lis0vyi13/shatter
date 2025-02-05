import { useEffect } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { useAppSelector } from "@/redux/app/hooks";

import { cn, scrollToChatLink } from "@/utils";
import useUser from "@/hooks/useUser";
import useFetchUsersChat from "./hooks/useFetchUsersChat";
import { useDragDropHandler } from "./hooks/useDragDropHandler";

import ChatListItems from "./ChatListItems";

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

  const debouncedSearchValue = useAppSelector(
    (store) => store.search.searchInput.debouncedValue,
  );

  // chats that includes user chats OR chats by query
  const { currentChats, setCurrentChats } = useFetchUsersChat(
    data,
    debouncedSearchValue,
  );

  const { onDragEnd } = useDragDropHandler(
    currentUser as IUser,
    setCurrentChats,
  );

  useEffect(() => {
    scrollToChatLink(listRef, activeChat);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChats]);

  //  overflow-auto
  return (
    <section
      className={cn(
        "chat-list flex-1 relative h-full user-list custom-scrollbar chat-scrollbar -ml-2 mt-2 overflow-auto",
        className,
      )}
    >
      <div ref={listRef} className={`flex flex-col transition-all duration-0`}>
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
