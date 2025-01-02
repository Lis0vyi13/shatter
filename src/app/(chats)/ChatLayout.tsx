"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import useAuth from "@/hooks/useAuth";
import { useApp } from "@/hooks/useApp";

import Sidebar from "@/components/Sidebar";
import Loader from "@/components/ui/Loader";
import useChatLayout from "./useChatLayout";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  useApp();
  useChatLayout();

  const mainRef = useRef(null);
  const isLogin = useAuth();
  const { replace } = useRouter();

  useEffect(() => {
    if (isLogin === false) {
      replace("/login");
      return;
    }
    if (localStorage.getItem("googleUserData")) {
      replace("/create-password");
    }
  }, [isLogin, replace]);

  return isLogin ? (
    <div className="px-4 py-2 flex min-h-full">
      <section className="wrapper flex-1 bg-dark rounded-[26px] flex">
        <aside className="hidden justify-center min-w-[96px] lg:flex">
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
