import { useEffect, useState } from "react";

import useUser from "@/hooks/useUser";
import { searchByDisplayName } from "@/services/user";

import { createChatTemplate } from "@/templates";

import { IChat } from "@/types/chat";
import { IUser } from "@/types/user";

const useFetchUsersChat = (data: IChat[] | null, searchValue: string) => {
  const [currentChats, setCurrentChats] = useState<IChat[] | null>(null);
  const user = useUser();
  useEffect(() => {
    const searchUser = async (query: string) => {
      const users = await searchByDisplayName(query);
      return users.filter((u) => u.uid !== user?.uid);
    };

    const fetchData = async () => {
      if (searchValue === "") {
        setCurrentChats(data || null);
      } else {
        const chatsByQuery =
          data?.filter((chat) => {
            if (user) {
              return chat.title[user.uid]
                .toLowerCase()
                .includes(searchValue.toLowerCase());
            }
          }) || [];
        const usersByQuery = await searchUser(searchValue);
        const usersChats: IChat[] = usersByQuery.map((searchedUser) =>
          createChatTemplate(user as IUser, searchedUser)
        );

        const combinedList = [...chatsByQuery, ...usersChats];
        if (user) {
          const uniqueChats = combinedList.reduce<IChat[]>((acc, chat) => {
            const isDuplicate = acc.some(
              (existingChat) =>
                existingChat.id === chat.id ||
                chat.id === user.uid ||
                (new Set(existingChat.members).size ===
                  new Set(chat.members).size &&
                  existingChat.members.every((member) =>
                    chat.members.includes(member)
                  ))
            );

            if (!isDuplicate) {
              acc.push(chat);
            }

            return acc;
          }, []);
          setCurrentChats(uniqueChats);
        }
      }
    };
    fetchData();
  }, [searchValue, data, user]);

  return { currentChats, setCurrentChats };
};

export default useFetchUsersChat;
