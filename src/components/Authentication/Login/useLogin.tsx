"use client";

import { useEffect } from "react";

import useAuth from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import useActions from "@/hooks/useActions";

const useLogin = () => {
  const isAuth = useAuth();
  const { setUser } = useActions();
  const { replace } = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname?.includes("login");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(1);
      if (user) {
        setUser(user);
      }
    });

    return () => unsubscribe();
  }, [setUser]);

  useEffect(() => {
    if (isAuth && !localStorage.getItem("googleUserData")) {
      replace("/c");
    }
  }, [isAuth]);

  return { isLoginPage };
};

export default useLogin;
