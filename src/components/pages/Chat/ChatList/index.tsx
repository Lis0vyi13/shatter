import { DragDropContext } from "@hello-pangea/dnd";
import { useAppSelector } from "@/redux/app/hooks";

import { cn } from "@/utils";
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
}

const ChatList = ({ data, activeChat, func, className }: IChatList) => {
  const currentUser = useUser();

  const loading = useAppSelector((store) => store.chat.isLoading);
  const searchValue = useAppSelector((store) => store.search.searchInput.value);
  const debouncedSearchValue = useAppSelector(
    (store) => store.search.searchInput.debouncedValue
  );
  const { setSearchInputValue, setDebouncedSearchInputValue } = useActions();

  const { currentChats, setCurrentChats } = useFetchUsersChat(
    data,
    debouncedSearchValue
  );

  const { onDragEnd } = useDragDropHandler(
    currentUser as IUser,
    setCurrentChats
  );

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
        style={{ maxHeight: "calc(100% - 90px)" }}
        className={`mt-2 transition-all duration-0 -ml-2 overflow-auto custom-scrollbar chat-scrollbar`}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <ChatListItems
            chats={currentChats}
            activeChat={activeChat}
            handleCreateNewChat={func.handleCreateNewChat}
            handleSetActiveChat={func.handleSetActiveChat}
            loading={loading}
          />
        </DragDropContext>
      </div>
    </section>
  );
};

export default ChatList;
