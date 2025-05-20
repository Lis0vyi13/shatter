import { dbRealtime } from "@/firebase/firebaseConfig";
import { ref, onValue, update } from "firebase/database";
import { useEffect, useState } from "react";

export interface Message {
  id: string;
  receiverId: string;
  senderId: string;
  text: string;
  timestamp: number;
  isRead: boolean;
}

export const useChat = (
  currentUserId: string,
  chatUserId: string,
  chatId: string,
) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!chatId) return;

    const messagesRef = ref(dbRealtime, `messages/${chatId}`);
    setMessages([]);
    setLoading(true);

    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const msgs: Message[] = Object.entries(data)
          .map(([id, msg]) => (msg ? { id, ...msg } : null))
          .filter((msg): msg is Message => msg !== null)
          .sort((a, b) => a.timestamp - b.timestamp);

        setMessages(msgs);
        setLoading(false);

        msgs.forEach((msg) => {
          if (!msg.isRead && msg.receiverId === currentUserId) {
            update(ref(dbRealtime, `messages/${chatId}/${msg.id}`), {
              isRead: true,
            });
          }
        });
      } else {
        setMessages([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [currentUserId, chatUserId, chatId]);

  return { messages, loading };
};
