import { dbRealtime } from "@/firebase/firebaseConfig";
import { ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";

interface Chat {
  id: string;
  members: string[];
  [key: string]: unknown;
}

const useDbChats = (userId: string) => {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    const chatsRef = ref(dbRealtime, "chats");

    const unsubscribe = onValue(
      chatsRef,
      (snapshot) => {
        const data = snapshot.val() as Record<string, Chat> | null;
        if (data) {
          const userChats = Object.entries(data)
            .filter(
              ([, chat]) =>
                Array.isArray(chat.members) && chat.members.includes(userId),
            )
            .map(([, chat]) => ({
              ...chat,
            }));
          setChats(userChats);
        } else {
          setChats([]);
        }
      },
      (error) => {
        console.error("Firebase error: ", error);
      },
    );

    return () => unsubscribe();
  }, [userId]);

  return chats;
};

export default useDbChats;
