"use client";

import { useParams } from "next/navigation";
import { DragDropContext } from "@hello-pangea/dnd";
import { useAppSelector } from "@/redux/app/hooks";

import useUser from "@/hooks/useUser";
import useFetchUsersChat from "./hooks/useFetchUsersChat";
import useActions from "@/hooks/useActions";
import useActiveChat from "./hooks/useActiveChat";

import SearchUserDialog from "@/components/ui/Dialogs/SearchUserDialog";
import SearchInput from "@/components/ui/Inputs/SearchInput";
import ChatListItems from "./ChatListItems";

import { IChat } from "@/types/chat";
import { useDragDropHandler } from "./hooks/useDragDropHandler";
import { IUser } from "@/types/user";
import { useCreateNewChat } from "./hooks/useCreateNewChat";

const ChatList = ({ data }: { data: IChat[] | null }) => {
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

  // const createNewChat = async (chatData: IChat) => {
  //   setSearchInputValue("");
  //   setDebouncedSearchInputValue("");
  //   try {
  //     const uid = currentUser?.uid;

  //     if (!uid) {
  //       console.error("User ID is missing, unable to create chat.");
  //       return;
  //     }

  //     const data: IChat = { ...chatData, chatType: "individual" };

  //     const updatedUser = {
  //       ...currentUser,
  //       chats: [...currentUser.chats, chatData.id],
  //     };
  //     setUser(updatedUser);

  //     const chat = await createChat(data);

  //     if (chat.success && chat.data?.id) {
  //       const result = await addChatToUser(uid, chat.data.id);

  //       if (result.success && result.updatedUser) {
  //         setActiveChat(chat.data.id);
  //       } else {
  //         console.error("Failed to update user with the new chat.");
  //       }
  //     } else {
  //       console.error("Failed to create chat:", chat.error);
  //     }
  //   } catch (error) {
  //     console.error("Error creating or updating chat:", error);
  //   }
  // };

  const dialogProps = {
    data,
    createNewChat,
    activeChat,
    setActiveChat,
  };

  const createNewChatHandler = async (chatData: IChat) => {
    if (searchValue != "") {
      setSearchInputValue("");
      setDebouncedSearchInputValue("");
    }
    await createNewChat(chatData);
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
      <SearchInput
        autoComplete="off"
        className="py-[10px]"
        {...searchInputProps}
      />

      <div
        className={`mt-2 transition-all duration-0 -ml-2 overflow-auto custom-scrollbar chat-scrollbar`}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <ChatListItems
            chats={currentChats}
            activeChat={activeChat}
            createNewChat={createNewChatHandler}
            setActiveChat={setActiveChatHandler}
          />
        </DragDropContext>
      </div>

      <div className="absolute transition-all duration-200 right-3 bottom-2">
        <SearchUserDialog {...dialogProps} />
      </div>
    </section>
  );
};

export default ChatList;
