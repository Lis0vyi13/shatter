"use client";

import { ReactNode, useEffect } from "react";

import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const { replace } = useRouter();
  const isLogin = useAuth();

  useEffect(() => {
    if (isLogin && !localStorage.getItem("googleUserData")) {
      replace("/c");
    }
    if (localStorage.getItem("googleUserData")) {
      replace("/create-password");
    }
  }, [isLogin, replace]);

  return <div className="min-h-full">{children}</div>;
};

export default AuthLayout;
