"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

import Layout from "@/layouts";

const ChatLayout = ({ children }: { children: ReactNode }) => {
  const { replace } = useRouter();
  const isLogin = useAuth();

  useEffect(() => {
    if (isLogin === false) {
      replace("/login");
    }
  }, [isLogin, replace]);

  return <Layout>{children}</Layout>;
};

export default ChatLayout;
