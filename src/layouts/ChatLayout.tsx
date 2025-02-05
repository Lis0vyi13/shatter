import { useRef } from "react";
import { Outlet } from "react-router-dom";

import useChats from "@/hooks/useChats";

import useChatLayout from "@/components/pages/Chat/hooks/useChatLayout";
import ChatListBlock from "@/components/pages/Chat/ChatList/ChatListBlock";

const ChatLayout = () => {
  useChatLayout();

  const mainRef = useRef(null);
  const chats = useChats();

  return (
    <main ref={mainRef} className="bg-white rounded-3xl flex flex-1 my-2 mr-2">
      <div className="bg-white box-content pr-2 rounded-3xl rounded-r-none overflow-hidden gap-2 pl-4 w-[min(300px,_100%)]">
        <ChatListBlock data={chats} />
      </div>
      <Outlet />
    </main>
  );
};

export default ChatLayout;
