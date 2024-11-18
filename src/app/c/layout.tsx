"use client";

import { ReactNode, Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

import ChatLayout from "./ChatLayout";

const Layout = ({ children }: { children: ReactNode }) => {
  const { replace } = useRouter();
  const isLogin = useAuth();

  useEffect(() => {
    if (isLogin === false) {
      replace("/login");
    }
  }, [isLogin, replace]);

  return (
    <Suspense>
      <ChatLayout>{children}</ChatLayout>
    </Suspense>
  );
};

export default Layout;
