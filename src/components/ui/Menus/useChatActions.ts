"use client";

import { usePathname, useRouter } from "next/navigation";
import { togglePinChat } from "@/services/firebase";

export const useChatActions = () => {
  const pathname = usePathname();
  const router = useRouter();

  const openChat = (id: string) => {
    const category = pathname?.split("/")[1];
    router.push(`/${category}/${id}`);
  };

  const doTogglePinChat = async (userId: string, chatId: string) => {
    await togglePinChat(userId, chatId);
  };

  const archiveChat = () => {
    console.log("Archive clicked");
  };

  const clearChatHistory = () => {
    console.log("Clear history clicked");
  };

  const deleteChat = () => {
    console.log("Delete chat clicked");
  };

  return {
    openChat,
    doTogglePinChat,
    archiveChat,
    clearChatHistory,
    deleteChat,
  };
};
