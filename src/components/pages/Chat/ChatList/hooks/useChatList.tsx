import { useCallback } from "react";
import { useAppSelector } from "@/redux/app/hooks";

import useActions from "@/hooks/useActions";
import { useCreateNewChat } from "./useCreateNewChat";

import { IChat } from "@/types/chat";

const useChatList = () => {
  const { setIsChatLoading, setActiveChat } = useActions();
  const { setSearchInputValue, setDebouncedSearchInputValue } = useActions();
  const searchValue = useAppSelector((store) => store.search.searchInput.value);

  const createNewChat = useCreateNewChat();

  const createNewChatHandler = async (chatData: IChat) => {
    setIsChatLoading(true);
    setSearchInputValue("");
    setDebouncedSearchInputValue("");
    await createNewChat(chatData);
    setIsChatLoading(false);
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
