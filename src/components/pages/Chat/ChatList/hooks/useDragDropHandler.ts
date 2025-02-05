import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DropResult } from "@hello-pangea/dnd";
import { db } from "@/firebase/firebaseConfig";
import { doc, getDoc, writeBatch } from "firebase/firestore";

import useChats from "@/hooks/useChats";
import useActions from "@/hooks/useActions";

import { IChat } from "@/types/chat";
import { IUser } from "@/types/user";

export const useDragDropHandler = (
  user: IUser,
  setLocalChats: Dispatch<SetStateAction<IChat[] | null>>,
) => {
  const chats = useChats();
  const { setChats: setReduxChats } = useActions();
  const [chatsToUpdate, setChatsToUpdate] = useState<Record<string, number>>(
    {},
  );

  const onDragEnd = async (result: DropResult) => {
    const { destination, source } = result;

    if (!destination || destination.index === source.index) return;

    const updatedChats = [...(chats as IChat[])];
    const [movedChat] = updatedChats.splice(source.index, 1);
    updatedChats.splice(destination.index, 0, movedChat);

    setLocalChats(updatedChats);
    setReduxChats(updatedChats);

    const updatedState: Record<string, number> = {};
    const firstChat = updatedChats[source.index];
    const secondChat = updatedChats[destination.index];
    updatedState[firstChat.id] = source.index;
    updatedState[secondChat.id] = destination.index;

    setChatsToUpdate(updatedState);

    const batch = writeBatch(db);

    for (const chatId in updatedState) {
      const collection = user.favorites === chatId ? "favorites" : "chats";
      const chatRef = doc(db, collection, chatId);

      try {
        const chatDoc = await getDoc(chatRef);
        const chatData = chatDoc.data();

        batch.update(chatRef, {
          order: { ...chatData?.order, [user.uid]: updatedState[chatId] },
        });
      } catch (error) {
        console.error("Error updating chat order:", error);
      }
    }

    try {
      await batch.commit();
    } catch (error) {
      console.error("Error committing batch update:", error);
    }
  };

  useEffect(() => {
    const beforeUnloadHandler = () => {
      if (chatsToUpdate) {
        localStorage.setItem("chatsToUpdate", JSON.stringify(chatsToUpdate));
      }
    };
    window.addEventListener("beforeunload", beforeUnloadHandler);

    return () => {
      window.removeEventListener("beforeunload", beforeUnloadHandler);
    };
  }, [chatsToUpdate]);

  useEffect(() => {
    const chatsToUpdate =
      localStorage.getItem("chatsToUpdate") !== null
        ? JSON.parse(localStorage.getItem("chatsToUpdate")!)
        : null;

    if (!chatsToUpdate) return;

    const shouldUpdate =
      chats?.find((chat) => chat.id === Object.keys(chatsToUpdate)[0])?.order !=
      chatsToUpdate[Object.keys(chatsToUpdate)[0]];

    if (!shouldUpdate) return;

    const updateChatOrder = async () => {
      const batch = writeBatch(db);

      for (const chatId in chatsToUpdate) {
        const collection = user.favorites === chatId ? "favorites" : "chats";
        const chatRef = doc(db, collection, chatId);

        try {
          const chatDoc = await getDoc(chatRef);
          const chatData = chatDoc.data();

          batch.update(chatRef, {
            order: { ...chatData?.order, [user.uid]: chatsToUpdate[chatId] },
          });
        } catch (error) {
          console.error("Error updating chat order:", error);
        }
      }

      try {
        await batch.commit();
        localStorage.removeItem("chatsToUpdate");
      } catch (error) {
        console.error("Error committing batch update:", error);
      }
    };

    updateChatOrder();
  }, [chats, user?.favorites, user?.uid, chatsToUpdate]);

  return { onDragEnd };
};
