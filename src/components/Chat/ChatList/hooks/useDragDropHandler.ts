import { Dispatch, SetStateAction } from "react";
import { DropResult } from "@hello-pangea/dnd";
import { db } from "@/firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import useChats from "@/hooks/useChats";
import useActions from "@/hooks/useActions";

import { IChat } from "@/types/chat";
import { IUser } from "@/types/user";

export const useDragDropHandler = (
  user: IUser,
  setChats: Dispatch<SetStateAction<IChat[] | null>>
) => {
  const chats = useChats();
  const { setChats: setReduxChats } = useActions();

  const onDragEnd = async (result: DropResult) => {
    const { destination, source } = result;
    if (!destination || destination.index === source.index) return;

    const updatedChats = [...(chats as IChat[])];
    const [movedChat] = updatedChats.splice(source.index, 1);
    updatedChats.splice(destination.index, 0, movedChat);

    const updatedState: Record<string, number> = {};

    const firstChat = updatedChats[source.index];
    const secondChat = updatedChats[destination.index];

    updatedState[firstChat.id] = source.index;
    updatedState[secondChat.id] = destination.index;

    setChats(updatedChats);
    setReduxChats(updatedChats);
    for (const chatId in updatedState) {
      try {
        const collection = user.favorites === chatId ? "favorites" : "chats";
        const chatRef = doc(db, collection, chatId);
        const chatDoc = await getDoc(chatRef);
        const chatData = chatDoc.data();

        await updateDoc(chatRef, {
          order: { ...chatData?.order, [user.uid]: updatedState[chatId] },
        });
      } catch (error) {
        console.error("Error updating chat order:", error);
      }
    }
  };

  return { onDragEnd };
};
