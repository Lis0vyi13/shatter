"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import useUser from "@/hooks/useUser";
import { getChatById } from "@/services/firebase";

import ChatBlock from "@/components/Chat/ChatBlock";

import { IChat } from "@/types/chat";

const ChatPage = () => {
  const { id } = useParams();
  const user = useUser();
  const [chat, setChat] = useState<IChat | null>(null);

  useEffect(() => {
    async function getChat() {
      if (user) {
        const currentChat = await getChatById(user?.uid, id as string);
        setChat(currentChat);
      }
    }
    getChat();
  }, [id, user]);

  return (
    <div className="chat-page overflow-hidden flex flex-1">
      <ChatBlock chat={chat} />
    </div>
  );
};

export default ChatPage;
