import { Dispatch, useEffect, useState } from "react";

import useUser from "@/hooks/useUser";
import { searchUsersByDisplayName } from "@/services/user";
import useActions from "@/hooks/useActions";

import { createChatTemplate } from "@/templates";

import { IChat } from "@/types/chat";
import { IUser } from "@/types/user";

const useFetchUsersChat = (
  data: IChat[] | null,
  searchValue: string,
  loading: boolean = true,
  setLoading?: Dispatch<React.SetStateAction<boolean>>,
) => {
  const [currentChats, setCurrentChats] = useState<IChat[] | null>(data);
  const user = useUser();
  const { setIsChatLoading } = useActions();

  useEffect(() => {
    const searchUsers = async (query: string): Promise<IUser[]> => {
      const users = await searchUsersByDisplayName(query);
      return users.filter((u) => u.uid !== user?.uid);
    };

    const fetchData = async () => {
      try {
        if (!user) return;

        if (searchValue === "") {
          setCurrentChats(data);
          return;
        }
        if (loading) setIsChatLoading(true);
        if (setLoading) setLoading(true);
        const chatsByQuery =
          data?.filter((chat) =>
            chat.title[user.uid]
              ?.toLowerCase()
              .includes(searchValue.toLowerCase()),
          ) || [];

        const usersByQuery = await searchUsers(searchValue);
        const usersChats: IChat[] = usersByQuery.map((searchedUser) =>
          createChatTemplate(user, searchedUser),
        );

        const existingMembers = new Set(
          chatsByQuery.map((chat) => chat.members[1]),
        );
        const filteredUsersChats = usersChats.filter(
          (chat) =>
            !existingMembers.has(chat.members[1]) &&
            chat.members[1] != user.uid,
        );

        const combinedList = [...chatsByQuery, ...filteredUsersChats];
        setCurrentChats([...combinedList]);
        if (loading) setIsChatLoading(false);
        if (setLoading) setLoading(false);
      } catch (error) {
        console.error("Error fetching chats:", error);
        if (loading) setIsChatLoading(false);
        if (setLoading) setLoading(false);
      }
    };

    fetchData();
  }, [searchValue, data, user, loading, setIsChatLoading, setLoading]);

  return { currentChats, setCurrentChats };
};

export default useFetchUsersChat;
