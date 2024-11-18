"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import useAuth from "@/hooks/useAuth";
import { useApp } from "@/hooks/useApp";
import useEmailVerification from "@/hooks/useEmailVerification";

import Sidebar from "@/components/Sidebar";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  useEmailVerification();
  useApp();

  const mainRef = useRef(null);
  const isLogin = useAuth();
  const { replace } = useRouter();

  useEffect(() => {
    if (isLogin === false) {
      replace("/login");
    }
  }, [isLogin, replace]);

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
