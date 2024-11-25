"use client";

import useChats from "@/hooks/useChats";

import Block from "@/components/ui/Block";
import ChatList from "./ChatList";
import ChatDetails from "./ChatDetails";
import Chat from "./Chat";

import { IChat } from "@/types/chat";

const ChatBlock = ({ chat }: { chat: IChat | null }) => {
  const chats = useChats();
  return (
    <Block color={"dark"} className={`chat-block flex gap-2 pr-2`}>
      {chat ? (
        <>
          <div className={`flex bg-white rounded-3xl w-full gap-2 pl-4`}>
            <div className="chat-list-wrapper min-w-[300px] h-full py-4">
              <ChatList data={chats} />
            </div>
            <div className="chat flex flex-col px-3 py-4 flex-1">
              <Chat data={chat} />
            </div>
          </div>
          <div className="chat-details-wrapper">
            <ChatDetails data={chat} />
          </div>
        </>
      ) : (
        <div className={`flex bg-white rounded-3xl w-full gap-2 pl-4`}>
          <div className="chat-list w-[min(300px,_100%)] h-full py-4">
            <ChatList data={chats || null} />
          </div>
          <div className="chat flex bg-gray bg-opacity-30 p-4 justify-center items-center flex-col w-full px-3 flex-1">
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
