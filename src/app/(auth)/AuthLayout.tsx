"use client";

import { ReactNode, useEffect } from "react";

import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const { replace } = useRouter();
  const isLogin = useAuth();

  useEffect(() => {
    if (isLogin) {
      replace("/c");
    }
  }, [isLogin, replace]);

  return children;
};

export default AuthLayout;
