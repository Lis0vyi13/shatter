import { useEffect } from "react";

import { fetchChats, getFavoriteChat } from "@/services/chat";

import useActions from "@/hooks/useActions";
import useUser from "@/hooks/useUser";
import { updateChatList } from "../utils/updateChatList";

const useChatLayout = () => {
  const { setChats, setFavorites } = useActions();
  const user = useUser();

  useEffect(() => {
    console.log(4);
    const initializeChats = async () => {
      if (!user || !user.uid) return;

      try {
        const { chats: userChats, favorites: favoriteChatId } = user;

        const favoriteChat = favoriteChatId
          ? await getFavoriteChat(favoriteChatId)
          : null;

        const currentChats = await fetchChats(userChats);

        const sortedChats = updateChatList({
          chats: currentChats,
          favoriteChat,
          userId: user.uid,
        });

        setFavorites(favoriteChat);
        setChats(sortedChats);
      } catch (error) {
        console.error("Error initializing chats:", error);
        setChats([]);
      }
    };
    initializeChats();
  }, [user, setChats, setFavorites]);

  return null;
};

export default useChatLayout;
