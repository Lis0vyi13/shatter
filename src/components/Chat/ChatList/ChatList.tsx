"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { DragDropContext } from "@hello-pangea/dnd";
import { useAppSelector } from "@/redux/app/hooks";

import useUser from "@/hooks/useUser";
import useFetchUsersChat from "./hooks/useFetchUsersChat";
import useActions from "@/hooks/useActions";
import useActiveChat from "./hooks/useActiveChat";
import { useDragDropHandler } from "./hooks/useDragDropHandler";
import { useCreateNewChat } from "./hooks/useCreateNewChat";

import SearchUserDialog from "@/components/ui/Dialogs/SearchUserDialog";
import SearchInput from "@/components/ui/Inputs/SearchInput";
import ChatListItems from "./ChatListItems";

import { IChat } from "@/types/chat";
import { IUser } from "@/types/user";

import { FaArrowLeftLong } from "react-icons/fa6";

const ChatList = ({ data }: { data: IChat[] | null }) => {
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams<{ id: string }>();
  const currentUser = useUser();
  const { activeChat, setActiveChat } = useActiveChat(params?.id);
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

  const createNewChat = useCreateNewChat({
    user: currentUser as IUser,
    setActiveChat,
  });

  const searchInputProps = {
    name: "search",
    placeholder: "Search...",
    value: searchValue,
    setValue: setSearchInputValue,
    setDebouncedValue: setDebouncedSearchInputValue,
  };

  const createNewChatHandler = async (chatData: IChat) => {
    setIsLoading(true);
    setSearchInputValue("");
    setDebouncedSearchInputValue("");
    await createNewChat(chatData);
    setIsLoading(false);
  };

  const dialogProps = {
    data,
    createChat: createNewChatHandler,
    setActiveChat,
  };

  const setActiveChatHandler = async (id: string) => {
    if (searchValue != "") {
      setSearchInputValue("");
      setDebouncedSearchInputValue("");
    }
    setActiveChat(id);
  };

  return (
    <section className="chat-list relative user-list flex flex-col custom-scrollbar h-full">
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
            createNewChat={createNewChatHandler}
            setActiveChat={setActiveChatHandler}
            loading={isLoading}
          />
        </DragDropContext>
      </div>

      <div className="absolute transition-all duration-200 right-3 bottom-3">
        <SearchUserDialog {...dialogProps} />
      </div>
    </section>
  );
};

export default ChatList;
