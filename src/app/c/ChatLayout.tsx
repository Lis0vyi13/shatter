"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

import useAuth from "@/hooks/useAuth";
import { useApp } from "@/hooks/useApp";
import useEmailVerification from "@/hooks/useEmailVerification";

import Sidebar from "@/components/Sidebar";
import useActions from "@/hooks/useActions";
import useUser from "@/hooks/useUser";

import { IChat } from "@/types/chat";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  useEmailVerification();
  useApp();

  const mainRef = useRef(null);
  const isLogin = useAuth();
  const { replace } = useRouter();
  const { setChats } = useActions();
  const user = useUser();

  useEffect(() => {
    if (isLogin === false) {
      replace("/login");
    }
  }, [isLogin, replace]);

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

  return (
    <div className="px-4 py-2 flex min-h-full">
      <section className="wrapper flex-1 bg-dark rounded-[26px] flex">
        <aside className="flex justify-center min-w-[96px]">
          <Sidebar />
        </aside>
        <main ref={mainRef} className="flex flex-1 py-2">
          {children}
        </main>
      </section>
    </div>
  );
};

export default ChatLayout;
