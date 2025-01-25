import { Dispatch, SetStateAction, useEffect, useState } from "react";

import useUser from "@/hooks/useUser";
import { searchByDisplayName } from "@/services/user";

import { createChatTemplate } from "@/templates";

import { IChat } from "@/types/chat";
import { IUser } from "@/types/user";

const useFetchUsersChat = (
  data: IChat[] | null,
  searchValue: string,
  setIsLoading?: Dispatch<SetStateAction<boolean>>
) => {
  const [currentChats, setCurrentChats] = useState<IChat[] | null>(data);
  const user = useUser();
  useEffect(() => {
    const searchUser = async (query: string): Promise<IUser[]> => {
      const users = await searchByDisplayName(query);
      return users.filter((u) => u.uid !== user?.uid);
    };

    const fetchData = async () => {
      if (setIsLoading) setIsLoading(true);

      try {
        if (!user) return;

        if (searchValue === "") {
          setCurrentChats(data);
          return;
        }

        const chatsByQuery =
          data?.filter((chat) =>
            chat.title[user.uid]
              ?.toLowerCase()
              .includes(searchValue.toLowerCase())
          ) || [];

        const usersByQuery = await searchUser(searchValue);
        const usersChats: IChat[] = usersByQuery.map((searchedUser) =>
          createChatTemplate(user, searchedUser)
        );

        const combinedList = [...chatsByQuery, ...usersChats];
        const uniqueChats = Array.from(
          new Map(combinedList.map((chat) => [chat.id, chat])).values()
        );

        setCurrentChats(uniqueChats);
      } catch (error) {
        console.error("Error fetching chats:", error);
      } finally {
        if (setIsLoading) setIsLoading(false);
      }
    };

    fetchData();
  }, [searchValue, data, user, setIsLoading]);

  return { currentChats, setCurrentChats };
};

export default useFetchUsersChat;
