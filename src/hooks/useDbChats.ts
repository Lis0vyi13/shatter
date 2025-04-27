import { dbRealtime } from "@/firebase/firebaseConfig";
import { ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";

interface Chat {
  id: string;
  members: Record<string, boolean>;
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
            .filter(([, chat]) => chat?.members?.[userId])
            .map(([, chat]) => {
              const { members, ...rest } = chat;
              return { members, ...rest };
            });

          setChats(userChats);
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
