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

const generateChatId = (user1: string, user2: string) => {
  return user1 < user2 ? `${user1}_${user2}` : `${user2}_${user1}`;
};

const useChat = (currentUserId: string, chatUserId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const chatId = generateChatId(currentUserId, chatUserId);
    const messagesRef = ref(dbRealtime, `messages/${chatId}`);

    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const msgs: Message[] = Object.entries(data)
          .map(([id, msg]) => (msg ? { id, ...msg } : null))
          .filter((msg): msg is Message => msg !== null);

        setMessages(msgs);

        msgs.forEach((msg) => {
          if (!msg.isRead && msg.receiverId === currentUserId) {
            update(ref(dbRealtime, `messages/${chatId}/${msg.id}`), {
              isRead: true,
            });
          }
        });
      } else {
        setMessages([]);
      }
    });

    return () => unsubscribe();
  }, [currentUserId, chatUserId]);

  return messages;
};

export default useChat;
