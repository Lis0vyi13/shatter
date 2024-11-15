"use client";

import { useEffect } from "react";
import { useParams, usePathname } from "next/navigation";
import { auth } from "@/firebase/firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import { toast } from "sonner";

import ChatBlock from "@/components/Chat/ChatBlock";

const Chat = () => {
  const params = useParams();
  const pathname = usePathname();
  useEffect(() => {
    const handleAuthStateChanged = async (user: User | null) => {
      if (user && pathname?.includes("/c")) {
        const toastShown = sessionStorage.getItem("toastShown");

        if (!toastShown) {
          toast.success("You have successfully signed in!");
          sessionStorage.setItem("toastShown", "true");
        }
      }
    };

    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChanged);
    return () => unsubscribe();
  }, [pathname]);

  return (
    <div className="chat-page overflow-hidden flex flex-1">
      <ChatBlock id={params?.id as string} />
    </div>
  );
};

export default Chat;
