import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DropResult } from "@hello-pangea/dnd";
import { ref, get, update } from "firebase/database";

import useChats from "@/hooks/useChats";
import useActions from "@/hooks/useActions";

import { IChat } from "@/types/chat";
import { IUser } from "@/types/user";
import { dbRealtime } from "@/firebase/firebaseConfig";

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

    const updates: Record<string, any> = {};

    for (const chatId in updatedState) {
      const collection = user.favorites === chatId ? "favorites" : "chats";
      const chatRef = ref(dbRealtime, `${collection}/${chatId}`);

      try {
        const chatSnapshot = await get(chatRef);
        const chatData = chatSnapshot.val() as IChat | null;

        if (!chatData) {
          console.error(`Chat ${chatId} does not exist.`);
          continue;
        }

        const currentOrder = chatData.order || {};
        updates[`${collection}/${chatId}/order`] = {
          ...currentOrder,
          [user.uid]: updatedState[chatId],
        };
      } catch (error) {
        console.error("Error updating chat order:", error);
      }
    }

    try {
      await update(ref(dbRealtime), updates);
    } catch (error) {
      console.error("Error committing updates:", error);
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
    const chatsToUpdateData =
      localStorage.getItem("chatsToUpdate") !== null
        ? JSON.parse(localStorage.getItem("chatsToUpdate")!)
        : null;

    if (!chatsToUpdateData) return;

    const shouldUpdate =
      chats?.find((chat) => chat.id === Object.keys(chatsToUpdateData)[0])
        ?.order?.[user.uid] !==
      chatsToUpdateData[Object.keys(chatsToUpdateData)[0]];

    if (!shouldUpdate) return;

    const updateChatOrder = async () => {
      const updates: Record<string, any> = {};

      for (const chatId in chatsToUpdateData) {
        const collection = user.favorites === chatId ? "favorites" : "chats";
        const chatRef = ref(dbRealtime, `${collection}/${chatId}`);

        try {
          const chatSnapshot = await get(chatRef);
          const chatData = chatSnapshot.val() as IChat | null;

          if (!chatData) {
            console.error(`Chat ${chatId} does not exist.`);
            continue;
          }

          const currentOrder = chatData.order || {};
          updates[`${collection}/${chatId}/order`] = {
            ...currentOrder,
            [user.uid]: chatsToUpdateData[chatId],
          };
        } catch (error) {
          console.error("Error updating chat order:", error);
        }
      }

      try {
        await update(ref(dbRealtime), updates);
        localStorage.removeItem("chatsToUpdate");
      } catch (error) {
        console.error("Error committing updates:", error);
      }
    };

    updateChatOrder();
  }, [chats, user?.favorites, user?.uid, chatsToUpdate]);

  return { onDragEnd };
};
