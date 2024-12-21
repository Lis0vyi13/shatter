"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import { getFavoriteChat, getAllChats } from "@/services/firebase";

import useAuth from "@/hooks/useAuth";
import { useApp } from "@/hooks/useApp";
import useEmailVerification from "@/hooks/useEmailVerification";
import useActions from "@/hooks/useActions";
import useUser from "@/hooks/useUser";

import Sidebar from "@/components/Sidebar";
import Loader from "@/components/ui/Loader";

import { IChat } from "@/types/chat";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  useEmailVerification();
  useApp();

  const mainRef = useRef(null);
  const isLogin = useAuth();
  const router = useRouter();
  const { setChats } = useActions();
  const user = useUser();

  useEffect(() => {
    if (isLogin === false) {
      router.replace("/login");
    }
  }, [isLogin, router]);

  useEffect(() => {
    const fetchChats = async () => {
      if (user?.chats) {
        try {
          if (user?.favorites) {
            const chats = await getAllChats(user.chats);
            const favoriteChat = await getFavoriteChat(user.favorites);
            const allChats = [...chats, favoriteChat];

            const { pinnedChats, regularChats } = allChats.reduce(
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
            setChats(sortedChats);
          }
        } catch (error) {
          console.error("Error fetching chats:", error);
          setChats([]);
        }
      }
    };

    fetchChats();
  }, [setChats, user, user?.chats, user?.favorites]);

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
