"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

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
        if (!user || !user.uid) return;

        const { chats: userChats, favorites: favoriteChatId } = user;

        let favoriteChat: IChat | null = null;

        const unsubscribeFavorite =
          favoriteChatId &&
          onSnapshot(
            doc(db, "favorites", favoriteChatId),
            (favoriteSnapshot) => {
              if (favoriteSnapshot.exists()) {
                favoriteChat = {
                  id: favoriteSnapshot.id,
                  ...favoriteSnapshot.data(),
                } as IChat;
                updateChatList(currentChats, favoriteChat);
              } else {
                favoriteChat = null;
                updateChatList(currentChats, null);
              }
            }
          );

        let currentChats: IChat[] = [];

        const unsubscribeChats =
          userChats &&
          userChats.length > 0 &&
          onSnapshot(
            query(collection(db, "chats"), where("id", "in", userChats)),
            (snapshot) => {
              currentChats = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              })) as IChat[];
              updateChatList(currentChats, favoriteChat);
            }
          );

        const updateChatList = (chats: IChat[], favoriteChat: IChat | null) => {
          const { pinnedChats, regularChats } = chats.reduce(
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

          if (favoriteChat) {
            const targetArray = favoriteChat.isPin.includes(user.uid)
              ? pinnedChats
              : regularChats;

            targetArray.push(favoriteChat);
          }

          pinnedChats.sort((a, b) => b.updatedAt - a.updatedAt);
          regularChats.sort((a, b) => b.updatedAt - a.updatedAt);

          const sortedChats = [...pinnedChats, ...regularChats];

          setChats(sortedChats);
        };

        return () => {
          if (unsubscribeChats) unsubscribeChats();
          if (unsubscribeFavorite) unsubscribeFavorite();
        };
      } catch (error) {
        console.error("Error initializing chats:", error);
        setChats([]);
      }
    };

    initializeChats();
  }, [setChats, user]);

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
