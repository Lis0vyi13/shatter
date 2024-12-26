"use client";

import { useParams } from "next/navigation";
import { db } from "@/firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useAppSelector } from "@/redux/app/hooks";

import { createChat } from "@/services/chat";

import useUser from "@/hooks/useUser";
import useFetchUsersChat from "../hooks/useFetchUsersChat";
import useActions from "@/hooks/useActions";
import useActiveChat from "../hooks/useActiveChat";

import SearchUserDialog from "@/components/ui/Dialogs/SearchUserDialog";
import SearchInput from "@/components/ui/SearchInput";
import ChatListItems from "./ChatListItems";

import { IChat } from "@/types/chat";

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

  const searchInputProps = {
    name: "search",
    placeholder: "Search...",
    value: searchValue,
    setValue: setSearchInputValue,
    setDebouncedValue: setDebouncedSearchInputValue,
  };

  const createNewChat = async (chatData: IChat) => {
    try {
      const uid = currentUser?.uid;
      const data: IChat = { ...chatData, chatType: "individual" };
      if (uid) {
        const chat = await createChat(data);
        if (chat.data?.id) setActiveChat(chat.data?.id);
        setSearchInputValue("");
      }
    } catch (error) {
      console.error("Error creating or updating chat:", error);
    }
  };

  const dialogProps = {
    data,
    createNewChat,
    activeChat,
    setActiveChat,
  };

  const onDragEnd = async (result: DropResult) => {
    const { destination, source } = result;
    if (!destination || destination.index === source.index) return;

    setCurrentChats((prevChats) => {
      const updatedChats = [...(prevChats as IChat[])];
      const [movedChat] = updatedChats.splice(source.index, 1);
      updatedChats.splice(destination.index, 0, movedChat);

      return updatedChats;
    });

    const userId = currentUser?.uid;
    const chatRef = doc(db, `chats/${userId}`);

    try {
      const chatDoc = await getDoc(chatRef);
      if (!chatDoc.exists()) {
        console.error("Document does not exist!");
        return;
      }

      const chatData = chatDoc.data();
      const chatsArray: IChat[] = chatData.chats;

      const [movedChat] = chatsArray.splice(source.index, 1);
      chatsArray.splice(destination.index, 0, movedChat);

      chatsArray.forEach((chat, index) => {
        if (chat.isPin) {
          chat.order = index;
        }
      });

      await updateDoc(chatRef, { chats: chatsArray });
    } catch (error) {
      console.error("Error updating chat order:", error);
    }
  };

  return (
    <section className="chat-list relative user-list flex flex-col custom-scrollbar h-full">
      <SearchInput className="py-[10px]" {...searchInputProps} />

      <div
        className={`mt-2 transition-all duration-0 -ml-2 overflow-auto custom-scrollbar chat-scrollbar`}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <ChatListItems
            chats={currentChats}
            activeChat={activeChat}
            createNewChat={(chatData) => createNewChat(chatData)}
            setActiveChat={setActiveChat}
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
