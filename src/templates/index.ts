import { v4 as uuidv4 } from "uuid";

import { IChat } from "@/types/chat";
import { UserData } from "@/types/user";
import favoritesLogo from "/public/favorites.png";

export const userToChat = (user: UserData): IChat => ({
  id: uuidv4(),
  title: user.displayName || "",
  members: [user.uid],
  messages: [],
  onlineUsers: [],
  lastMessage: null,
  avatar: user.photoUrl || "",
  updatedAt: Date.now(),
  unreadedMessages: 0,
  isPin: false,
  chatType: "none",
  info: {
    photos: 0,
    videos: 0,
    files: 0,
    audio: 0,
    links: 0,
    voice: 0,
  },
  folders: [],
});

export const generateFavoritesChatTemplate = (uid: string): IChat => ({
  id: uuidv4(),
  title: "Favorites",
  members: [uid],
  messages: [],
  onlineUsers: [],
  lastMessage: null,
  avatar: favoritesLogo,
  updatedAt: Date.now(),
  unreadedMessages: 0,
  isPin: false,
  chatType: "individual",
  info: {
    photos: 0,
    videos: 0,
    files: 0,
    audio: 0,
    links: 0,
    voice: 0,
  },
  folders: [],
});
