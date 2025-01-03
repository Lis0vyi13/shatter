"use client";

import { DragDropContext } from "@hello-pangea/dnd";
import { useAppSelector } from "@/redux/app/hooks";

import { cn } from "@/utils";
import useUser from "@/hooks/useUser";
import useFetchUsersChat from "./hooks/useFetchUsersChat";
import useActions from "@/hooks/useActions";
import { useDragDropHandler } from "./hooks/useDragDropHandler";

import SearchInput from "@/components/ui/Inputs/SearchInput";
import ChatListItems from "./ChatListItems";

import { IChat } from "@/types/chat";
import { IUser } from "@/types/user";

import { FaArrowLeftLong } from "react-icons/fa6";

interface IChatList {
  data: IChat[] | null;
  loading: boolean;
  activeChat: string;
  func: {
    createNewChat: (chatData: IChat) => Promise<void>;
    setActiveChat: (id: string) => Promise<void>;
  };
  className?: string;
}

const ChatList = ({
  data,
  loading,
  activeChat,
  func,
  className,
}: IChatList) => {
  const currentUser = useUser();
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

  const searchInputProps = {
    name: "search",
    placeholder: "Search...",
    value: searchValue,
    setValue: setSearchInputValue,
    setDebouncedValue: setDebouncedSearchInputValue,
  };

  return (
    <section
      className={cn(
        "chat-list relative user-list flex flex-col custom-scrollbar h-full",
        className
      )}
    >
      <div className="flex items-center gap-2 w-full">
        <FaArrowLeftLong className="block mdLg:hidden" />
        <SearchInput
          autoComplete="off"
          className="py-[10px] flex-1"
          {...searchInputProps}
        />
      </div>

      <div
        className={`mt-2 transition-all duration-0 -ml-2 overflow-auto custom-scrollbar chat-scrollbar`}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <ChatListItems
            chats={currentChats}
            activeChat={activeChat}
            createNewChat={func.createNewChat}
            setActiveChat={func.setActiveChat}
            loading={loading}
          />
        </DragDropContext>
      </div>
    </section>
  );
};

export default ChatList;
