"use client";

import { useEffect, useState } from "react";

import useChats from "@/hooks/useChats";

import Block from "@/components/ui/Block";
import ChatList from "./ChatList/ChatList";
import ChatDetails from "./ChatDetails";
import Chat from "./Chat";

import { IChat } from "@/types/chat";

const ChatBlock = ({ id }: { id?: string }) => {
  const [activeChat, setActiveChat] = useState<IChat | null>(null);
  const chats = useChats();

  useEffect(() => {
    const chat = chats?.find((chat) => chat.id == id);
    setActiveChat(chat || null);
  }, [chats, id]);

  return (
    <Block
      color={"dark"}
      className={`chat-block flex gap-2 pl-2 mdLg:pl-0 pr-2`}
    >
      {activeChat ? (
        <>
          <div className={`flex bg-white rounded-3xl w-full gap-2 pl-4`}>
            <div className="chat-list-wrapper min-w-[300px] h-full py-4 hidden mdLg:block">
              <ChatList data={chats} />
            </div>
            <div className="chat flex flex-col px-1 md:px-3 py-4 flex-1">
              <Chat data={activeChat} />
            </div>
          </div>
          <div className="chat-details-wrapper hidden xl:block">
            <ChatDetails data={activeChat} />
          </div>
        </>
      ) : (
        <div className={`flex bg-white rounded-3xl w-full gap-2 pl-4`}>
          <div className="chat-list w-[min(300px,_100%)] h-full py-4">
            <ChatList data={chats} />
          </div>
          <div className="chat flex bg-gray bg-opacity-30 rounded-r-3xl p-4 justify-center items-center flex-col w-full px-3 flex-1">
            <span className="px-4 py-2 text-xs text-[0.9rem] bg-dark text-white rounded-2xl">
              Choose who you would like to write to
            </span>
          </div>
        </div>
      )}
    </Block>
  );
};

export default ChatBlock;
