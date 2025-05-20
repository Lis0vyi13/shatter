import { Dispatch, useEffect, useState } from "react";

import useUser from "@/hooks/useUser";
import { searchUsersByDisplayName } from "@/services/user";
import useActions from "@/hooks/useActions";

import { createChatTemplate } from "@/templates";

import { IChat } from "@/types/chat";
import { IUser } from "@/types/user";
import { useLocation } from "react-router-dom";

const useFetchUsersChat = (
  data: IChat[] | null,
  searchValue: string,
  loading: boolean = true,
  setLoading?: Dispatch<React.SetStateAction<boolean>>,
) => {
  const [currentChats, setCurrentChats] = useState<IChat[] | null>(data);
  const user = useUser();
  const { setIsChatLoading } = useActions();
  const { pathname } = useLocation();
  const isArchiveChat = pathname.includes("archive");

  useEffect(() => {
    const searchUsers = async (query: string): Promise<IUser[]> => {
      const users = await searchUsersByDisplayName(query);
      return users.filter((u) => u.uid !== user?.uid);
    };

    const fetchData = async () => {
      try {
        if (!user) return;

        const filteredData =
          data?.filter((chat) =>
            isArchiveChat ? chat.isArchived : !chat.isArchived,
          ) || [];

        if (searchValue === "") {
          setCurrentChats(filteredData);
          return;
        }

        if (loading) setIsChatLoading(true);
        if (setLoading) setLoading(true);

        const chatsByQuery =
          filteredData?.filter((chat) =>
            chat?.title?.[user.uid]
              ?.toLowerCase()
              .includes(searchValue.toLowerCase()),
          ) || [];

        const usersByQuery = await searchUsers(searchValue);

        const usersChats: IChat[] = usersByQuery.map((searchedUser) =>
          createChatTemplate(user, searchedUser),
        );

        const existingMembers = new Set<string>();

        chatsByQuery.forEach((chat) => {
          Object.keys(chat.members).forEach((memberId) => {
            if (memberId !== user.uid) {
              existingMembers.add(memberId);
            }
          });
        });

        const filteredUsersChats = usersChats.filter((chat) => {
          const memberIds = Object.keys(chat.members).filter(
            (id) => id !== user.uid,
          );
          const otherUserId = memberIds[0];
          return otherUserId && !existingMembers.has(otherUserId);
        });

        const combinedList = [...chatsByQuery, ...filteredUsersChats];
        setCurrentChats(combinedList);

        if (loading) setIsChatLoading(false);
        if (setLoading) setLoading(false);
      } catch (error) {
        console.error("Error fetching chats:", error);
        if (loading) setIsChatLoading(false);
        if (setLoading) setLoading(false);
      }
    };

    fetchData();
  }, [
    searchValue,
    data,
    user,
    loading,
    setIsChatLoading,
    setLoading,
    isArchiveChat,
    pathname,
  ]);

  return { currentChats, setCurrentChats };
};

export default useFetchUsersChat;
