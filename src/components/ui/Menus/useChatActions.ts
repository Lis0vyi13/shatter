"use client";

import { usePathname, useRouter } from "next/navigation";

import { deleteChat, togglePinChat } from "@/services/chat";

export const useChatActions = () => {
  const pathname = usePathname();
  const router = useRouter();

  const openChat = (id: string) => {
    const category = pathname?.split("/")[1];
    router.push(`/${category}/${id}`);
  };

  const doTogglePinChat = async (
    userId: string,
    chatId: string,
    collection: "favorites" | "chats" = "chats"
  ): Promise<boolean> => {
    try {
      await togglePinChat(userId, chatId, collection);
      return true;
    } catch (error) {
      console.error("Error toggling pin state:", error);
      return false;
    }
  };

  const archiveChat = () => {
    console.log("Archive clicked");
  };

  const clearChatHistory = () => {
    console.log("Clear history clicked");
  };

  const doDeleteChat = async (uid: string, chatId: string) => {
    const user = await deleteChat(uid, chatId);
    return user?.updatedUser;
  };

  return {
    openChat,
    doTogglePinChat,
    archiveChat,
    clearChatHistory,
    doDeleteChat,
  };
};
