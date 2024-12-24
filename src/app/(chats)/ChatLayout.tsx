"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

import { getFavoriteChat } from "@/services/firebase";

import useAuth from "@/hooks/useAuth";
import { useApp } from "@/hooks/useApp";
import useActions from "@/hooks/useActions";
import useUser from "@/hooks/useUser";

import Sidebar from "@/components/Sidebar";
import Loader from "@/components/ui/Loader";

import { IChat } from "@/types/chat";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  useApp();

  const mainRef = useRef(null);
  const isLogin = useAuth();
  const { replace } = useRouter();
  const { setChats } = useActions();
  const user = useUser();

  useEffect(() => {
    if (isLogin === false) {
      replace("/login");
      return;
    }
    if (localStorage.getItem("googleUserData")) {
      replace("/create-password");
    }
  }, [isLogin, replace]);

  useEffect(() => {
    const initializeChats = async () => {
      try {
        const favoriteChat = user?.favorites
          ? await getFavoriteChat(user.favorites)
          : null;

        if (user?.chats && user.chats.length > 0) {
          const chatsRef = collection(db, "chats");

          const q = query(chatsRef, where("id", "in", user.chats));

          const unsubscribe = onSnapshot(q, (snapshot) => {
            const chatData = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })) as IChat[];

            const { pinnedChats, regularChats } = chatData.reduce(
              (acc, chat) => {
                if (chat.isPin.includes(user?.uid)) {
                  acc.pinnedChats.push(chat);
                } else {
                  acc.regularChats.push(chat);
                }
                return acc;
              },
              { pinnedChats: [] as IChat[], regularChats: [] as IChat[] }
            );

            const sortedChats = [...pinnedChats, ...regularChats];
            setChats(
              favoriteChat ? [favoriteChat, ...sortedChats] : sortedChats
            );
          });

          return () => unsubscribe();
        } else {
          if (favoriteChat) setChats([favoriteChat]);
        }
      } catch (error) {
        console.error("Error initializing chats:", error);
        setChats([]);
      }
    };

    initializeChats();
  }, [setChats, user?.chats, user?.favorites, user?.uid]);

  return isLogin ? (
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
  ) : (
    <Loader />
  );
};

export default ChatLayout;
