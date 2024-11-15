"use client";

import { useEffect } from "react";
import { auth } from "@/firebase/firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import { toast } from "sonner";

import ChatBlock from "@/components/Chat/ChatBlock";
import { useParams, usePathname } from "next/navigation";

const ChatPage = () => {
  const params = useParams<{ id: string }>();
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
    return () => {
      unsubscribe();
    };
  }, [pathname]);

  return (
    <div className="chat-page overflow-hidden flex flex-1">
      <ChatBlock id={params?.id} />
    </div>
  );
};

export default ChatPage;
