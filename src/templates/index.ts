import { v4 as uuidv4 } from "uuid";

import { createFavoritesChat } from "@/services/chat";
import { getUserById, updateUser } from "@/services/user";

import { IChat } from "@/types/chat";
import { IUser } from "@/types/user";

import favoritesLogo from "@/assets/favorites.png";

export const createChatTemplate = (user: IUser): IChat => ({
  id: uuidv4(),
  title: user.displayName || "",
  members: [user.uid],
  messages: [],
  onlineUsers: [],
  lastMessage: null,
  avatar: user.photoUrl || "",
  updatedAt: Date.now(),
  unreadMessages: 0,
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
  order: null,
});

export const createFavoritesChatTemplate = async (
  userId: string
): Promise<IChat | null> => {
  try {
    const user = await getUserById(userId);

    if (!user || user.favorites) {
      return null;
    }

    const chatId = uuidv4();
    const favoritesChat: IChat = {
      id: chatId,
      title: "Favorites",
      members: [userId],
      messages: [],
      onlineUsers: [],
      lastMessage: null,
      avatar: favoritesLogo,
      updatedAt: Date.now(),
      unreadMessages: 0,
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
      order: null,
    };

    await createFavoritesChat(favoritesChat);
    await updateUser(userId, { favorites: chatId });

    return favoritesChat;
  } catch (error) {
    console.error("Error creating favorites chat:", error);
    return null;
  }
};
