"use client";
import { useParams } from "next/navigation";

import ChatBlock from "@/components/Chat/ChatBlock";

const Chat = () => {
  const { id } = useParams();

  return (
    <div className="chat-page overflow-hidden flex flex-1">
      <ChatBlock id={id as string} />
    </div>
  );
};

export default Chat;
