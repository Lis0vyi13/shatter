"use client";

import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

import useUser from "@/hooks/useUser";
import useActions from "@/hooks/useActions";
import useChats from "@/hooks/useChats";

import Block from "@/components/ui/Block";
import ChatList from "./ChatList";
import Chat from "./Chat";

import { IChat } from "@/types/chat";
import ChatDetails from "./ChatDetails";

const ChatBlock = ({ id }: { id?: string }) => {
  const [activeChat, setActiveChat] = useState<IChat | null>(null);
  const user = useUser();
  const chats = useChats();
  const { setChats } = useActions();
  console.log(user);

  useEffect(() => {
    if (user?.uid) {
      const chatsRef = doc(db, "chats", user.uid);

      const unsubscribe = onSnapshot(chatsRef, (doc) => {
        if (doc.exists()) {
          const data = doc.data() as { chats: IChat[] };

          const { pinnedChats, regularChats } = data.chats.reduce(
            (acc, chat) => {
              if (chat.isPin) {
                acc.pinnedChats.push(chat);
              } else {
                acc.regularChats.push(chat);
              }
              return acc;
            },
            { pinnedChats: [] as IChat[], regularChats: [] as IChat[] }
          );

          const sortedChats = [...pinnedChats, ...regularChats];
          setChats(sortedChats);
        } else {
          setChats([]);
        }
      });

      return () => unsubscribe();
    }
  }, [setChats, user?.uid]);

  useEffect(() => {
    const chat = chats?.find((chat) => chat.id == id);
    setActiveChat(chat || null);
  }, [chats, id]);

  return (
    <Block color={"dark"} className={`chat-block flex gap-2 pr-2`}>
      {activeChat ? (
        <>
          <div className={`flex bg-white rounded-3xl w-full gap-2 pl-4`}>
            <div className="chat-list-wrapper w-[min(300px,_100%)] h-full py-4">
              <ChatList data={chats} />
            </div>
            <div className="chat flex flex-col px-3 py-4 flex-1">
              <Chat data={activeChat} />
            </div>
          </div>
          <div className="chat-details-wrapper">
            <ChatDetails data={activeChat} />
          </div>
        </>
      ) : (
        <div className={`flex bg-white rounded-3xl w-full gap-2 pl-4`}>
          <div className="chat-list w-[min(300px,_100%)] h-full py-4">
            <ChatList data={chats} />
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
