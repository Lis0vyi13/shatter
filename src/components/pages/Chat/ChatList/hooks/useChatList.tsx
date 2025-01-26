import { useCallback } from "react";
import { useAppSelector } from "@/redux/app/hooks";
import { addChatToUser, createChat } from "@/services/chat";

import useActions from "@/hooks/useActions";
import useUser from "@/hooks/useUser";

import { IChat } from "@/types/chat";

const useChatList = () => {
  const user = useUser();
  const { setActiveChat, setUser } = useActions();
  const {
    setSearchInputValue,
    setDebouncedSearchInputValue,
    setIsChatLoading,
  } = useActions();
  const searchValue = useAppSelector((store) => store.search.searchInput.value);

  const createNewChatHandler = async (chatData: IChat) => {
    setIsChatLoading(true);
    setSearchInputValue("");
    setDebouncedSearchInputValue("");
    try {
      const uid = user?.uid;

      if (!uid) {
        console.error("User ID is missing, unable to create chat.");
        return;
      }

      const data: IChat = { ...chatData, chatType: "individual" };

      const updatedUser = {
        ...user,
        chats: [...user.chats, chatData.id],
      };
      setUser(updatedUser);

      const chat = await createChat(data);

      if (chat.success && chat.data?.id) {
        await addChatToUser(uid, chat.data.id);
      } else {
        console.error("Failed to create chat:", chat.error);
      }
    } catch (error) {
      console.error("Error creating or updating chat:", error);
    } finally {
      setIsChatLoading(false);
    }
  };
  const setActiveChatHandler = useCallback(
    (id: string) => {
      if (searchValue != "") {
        setSearchInputValue("");
        setDebouncedSearchInputValue("");
      }
      setActiveChat(id);
    },
    [
      searchValue,
      setActiveChat,
      setDebouncedSearchInputValue,
      setSearchInputValue,
    ]
  );
  return { createNewChatHandler, setActiveChatHandler };
};

export default useChatList;
