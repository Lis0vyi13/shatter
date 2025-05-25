import { dbRealtime } from "@/firebase/firebaseConfig";
import { ILastMessage } from "@/types/chat";
import { DataSnapshot, off, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";

export const useLastMessage = (chatId: string | null) => {
  const [lastMessage, setLastMessage] = useState<ILastMessage | null>(null);

  useEffect(() => {
    if (!chatId) return;

    const messageRef = ref(dbRealtime, `chats/${chatId}/lastMessage`);

    const callback = (snapshot: DataSnapshot) => {
      if (snapshot.exists()) {
        setLastMessage(snapshot.val());
      } else {
        setLastMessage(null);
      }
    };

    onValue(messageRef, callback);

    return () => {
      off(messageRef, "value", callback);
    };
  }, [chatId]);

  return lastMessage;
};

// import { dbRealtime } from "@/firebase/firebaseConfig";
// import { ILastMessage } from "@/types/chat";
// import { off, onValue, ref } from "firebase/database";
// import { useEffect, useState } from "react";

// export const useLastMessage = (chatId: string | null) => {
//   const [lastMessage, setLastMessage] = useState<ILastMessage | null>(null);

//   useEffect(() => {
//     if (!chatId) return;

//     const messageRef = ref(dbRealtime, `chats/${chatId}/lastMessage`);

//     const unsubscribe = onValue(messageRef, (snapshot) => {
//       if (snapshot.exists()) {
//         setLastMessage(snapshot.val());
//       }
//     });

//     return () => {
//       off(messageRef);
//     };
//   }, [chatId]);

//   return lastMessage;
// };
