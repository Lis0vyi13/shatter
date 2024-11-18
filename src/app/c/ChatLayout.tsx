"use client";

import { Suspense, useRef } from "react";
import useAuth from "@/hooks/useAuth";
import { useApp } from "@/hooks/useApp";
import useEmailVerification from "@/hooks/useEmailVerification";

import Loader from "@/components/ui/Loader";
import Sidebar from "@/components/Sidebar";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  useEmailVerification();
  useApp();

  const mainRef = useRef(null);
  const isLogin = useAuth();
  const isCheckingAuth = isLogin === null;

  if (isCheckingAuth) {
    return <Loader />;
  }

  if (isLogin) {
    return (
      <div className="px-4 py-2 flex h-full">
        <section className="wrapper flex-1 bg-dark rounded-[26px] flex">
          <aside className="flex justify-center min-w-[96px]">
            <Sidebar />
          </aside>
          <main ref={mainRef} className="flex flex-1 py-2">
            <Suspense fallback={<Loader />}>{children}</Suspense>
          </main>
        </section>
      </div>
    );
  }

  return children;
};

export default ChatLayout;
