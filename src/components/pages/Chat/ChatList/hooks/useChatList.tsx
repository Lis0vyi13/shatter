import { Dispatch, SetStateAction, useCallback } from "react";
import { useAppSelector } from "@/redux/app/hooks";

import useActions from "@/hooks/useActions";
import useUser from "@/hooks/useUser";
import { useCreateNewChat } from "./useCreateNewChat";

import { IChat } from "@/types/chat";
import { IUser } from "@/types/user";

interface IUseChatList {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setActiveChat: Dispatch<SetStateAction<string>>;
}
const useChatList = ({ setIsLoading, setActiveChat }: IUseChatList) => {
  const currentUser = useUser();
  const { setSearchInputValue, setDebouncedSearchInputValue } = useActions();
  const searchValue = useAppSelector((store) => store.search.searchInput.value);

  const createNewChat = useCreateNewChat({
    user: currentUser as IUser,
  });

  const createNewChatHandler = async (chatData: IChat) => {
    setIsLoading(true);
    setSearchInputValue("");
    setDebouncedSearchInputValue("");
    await createNewChat(chatData);
    setIsLoading(false);
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
