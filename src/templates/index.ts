import { v4 as uuidv4 } from "uuid";

import { IChat } from "@/types/chat";
import { IUser } from "@/types/user";

import favoritesLogo from "@/assets/favorites.png";
import {
  createFavoritesChat,
  getUserById,
  updateUser,
} from "@/services/firebase";

export const createChatFromUser = (user: IUser): IChat => ({
  id: uuidv4(),
  title: user.displayName || "",
  members: [user.uid],
  messages: [],
  onlineUsers: [],
  lastMessage: null,
  avatar: user.photoUrl || "",
  updatedAt: Date.now(),
  unreadedMessages: 0,
  isPin: [],
  chatType: "none",
  info: {
    photos: 0,
    videos: 0,
    files: 0,
    audio: 0,
    links: 0,
    voice: 0,
  },
});

export const generateFavoritesChatTemplate = async (
  uid: string
): Promise<IChat | null> => {
  try {
    const user = await getUserById(uid);

    if (!user) {
      return null;
    }

    if (user.favorites) {
      return null;
    }
    const id = uuidv4();
    const newFavoritesChat: IChat = {
      id,
      title: "Favorites",
      members: [uid],
      messages: [],
      onlineUsers: [],
      lastMessage: null,
      avatar: favoritesLogo,
      updatedAt: Date.now(),
      unreadedMessages: 0,
      isPin: [],
      chatType: "individual",
      info: {
        photos: 0,
        videos: 0,
        files: 0,
        audio: 0,
        links: 0,
        voice: 0,
      },
    };

    await createFavoritesChat(newFavoritesChat);
    await updateUser(uid, { favorites: id });
    return newFavoritesChat;
  } catch (error) {
    console.error("Error generating favorites chat template:", error);
    return null;
  }
};
