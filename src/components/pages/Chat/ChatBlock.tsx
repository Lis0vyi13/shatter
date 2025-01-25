import { useEffect, useState } from "react";

import useChats from "@/hooks/useChats";
import useActiveChat from "@/hooks/useActiveChat";
import useActions from "@/hooks/useActions";

import Block from "@/components/ui/Block";
import ChatDetails from "./ChatDetails";
import Chat from "./Chat";
import ChatListBlock from "./ChatList/ChatListBlock";

import { IChat } from "@/types/chat";

const ChatBlock = ({ id }: { id?: string }) => {
  const activeChatId = useActiveChat();
  const chats = useChats();
  const { setActiveChat } = useActions();
  const [activeChat, setActiveChatData] = useState<IChat | null>(null);

  useEffect(() => {
    const chat = chats?.find((chat) => chat.id == id);
    if (chat) {
      setActiveChatData(chat);
      setActiveChat(chat.id);
    }
  }, [chats, id]);

  return (
    <Block color={"dark"} className={`chat-block flex gap-2 pl-2 pr-2 lg:pl-0`}>
      {activeChatId ? (
        <>
          <div
            className={`flex bg-white rounded-3xl overflow-hidden w-full gap-2 pl-4`}
          >
            <ChatListBlock data={chats} />
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
          {/* <div className="chat-list w-[min(300px,_100%)] h-full"> */}
          <ChatListBlock data={chats} />
          {/* </div> */}
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
