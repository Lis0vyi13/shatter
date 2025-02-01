import { v4 as uuidv4 } from "uuid";

import { createFavoritesChat } from "@/services/chat";
import { getUserById, updateUser } from "@/services/user";

import { IChat } from "@/types/chat";
import { IUser } from "@/types/user";

export const createChatTemplate = (user: IUser, participant: IUser): IChat => ({
  id: uuidv4(),
  members: [user.uid, participant.uid],
  title: {
    [user.uid]: participant.displayName,
    [participant.uid]: user.displayName,
  },
  avatar: {
    [user.uid]: participant.photoUrl,
    [participant.uid]: user.photoUrl,
  },
  messages: [],
  lastMessage: null,
  updatedAt: Date.now(),
  unreadMessages: {
    [user.uid]: 0,
    [participant.uid]: 0,
  },
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
  userId: string,
): Promise<IChat | null> => {
  try {
    const user = await getUserById(userId);

    if (!user || user.favorites) {
      return null;
    }

    const chatId = uuidv4();
    const favoritesChat: IChat = {
      id: chatId,
      title: { [userId]: "Favorites" },
      members: [userId],
      messages: [],
      lastMessage: null,
      avatar: "/favorites.png",
      updatedAt: Date.now(),
      unreadMessages: { userId: 0 },
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
