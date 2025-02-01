import { IChat } from "@/types/chat";

interface UpdateChatListParams {
  chats: IChat[];
  favoriteChat: IChat | null;
  userId?: string;
}

export const updateChatList = ({
  chats,
  favoriteChat,
  userId,
}: UpdateChatListParams) => {
  const { pinnedChats, regularChats } = chats.reduce(
    (acc, chat) => {
      if (userId && chat.isPin.includes(userId)) {
        acc.pinnedChats.push(chat);
      } else {
        acc.regularChats.push(chat);
      }
      return acc;
    },
    { pinnedChats: [] as IChat[], regularChats: [] as IChat[] },
  );

  if (favoriteChat) {
    const targetArray = favoriteChat.isPin.includes(userId || "")
      ? pinnedChats
      : regularChats;
    targetArray.push(favoriteChat);
  }

  pinnedChats.sort((a, b) => {
    const orderA = a.order?.[userId || ""] ?? null;
    const orderB = b.order?.[userId || ""] ?? null;

    if (orderA === null && orderB === null) {
      return b.updatedAt - a.updatedAt;
    }
    if (orderA === null) return 1;
    if (orderB === null) return -1;

    return orderA - orderB;
  });

  regularChats.sort((a, b) => b.updatedAt - a.updatedAt);

  return [...pinnedChats, ...regularChats];
};
