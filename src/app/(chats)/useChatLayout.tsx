import { useEffect } from "react";
import { db } from "@/firebase/firebaseConfig";
import useActions from "@/hooks/useActions";
import useUser from "@/hooks/useUser";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { IChat } from "@/types/chat";

const useChatLayout = () => {
  const { setChats } = useActions();
  const user = useUser();

  const updateChatList = (chats: IChat[], favoriteChat: IChat | null) => {
    const { pinnedChats, regularChats } = chats.reduce(
      (acc, chat) => {
        if (user?.uid && chat.isPin.includes(user.uid)) {
          acc.pinnedChats.push(chat);
        } else {
          acc.regularChats.push(chat);
        }
        return acc;
      },
      { pinnedChats: [] as IChat[], regularChats: [] as IChat[] }
    );

    if (favoriteChat) {
      const targetArray =
        user?.uid && favoriteChat.isPin.includes(user.uid)
          ? pinnedChats
          : regularChats;

      targetArray.push(favoriteChat);
    }

    pinnedChats.sort((a, b) => b.updatedAt - a.updatedAt);
    regularChats.sort((a, b) => b.updatedAt - a.updatedAt);

    const sortedChats = [...pinnedChats, ...regularChats];
    console.log("tutsd");
    setChats(sortedChats);
  };

  useEffect(() => {
    const initializeChats = async () => {
      if (!user || !user.uid) return;

      try {
        const { chats: userChats, favorites: favoriteChatId } = user;

        let favoriteChat: IChat | null = null;
        if (favoriteChatId) {
          const favoriteSnapshot = await getDoc(
            doc(db, "favorites", favoriteChatId)
          );
          if (favoriteSnapshot.exists()) {
            favoriteChat = {
              id: favoriteSnapshot.id,
              ...favoriteSnapshot.data(),
            } as IChat;
          }
        }

        let currentChats: IChat[] = [];
        if (userChats && userChats.length > 0) {
          const chatsSnapshot = await getDocs(
            query(collection(db, "chats"), where("id", "in", userChats))
          );
          currentChats = chatsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as IChat[];
        }

        updateChatList(currentChats, favoriteChat);
      } catch (error) {
        console.error("Error initializing chats:", error);
        setChats([]);
      }
    };

    initializeChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return null;
};

export default useChatLayout;
