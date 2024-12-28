import { Dispatch, SetStateAction } from "react";
import { DropResult } from "@hello-pangea/dnd";
import { db } from "@/firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import { IChat } from "@/types/chat";
import { IUser } from "@/types/user";

export const useDragDropHandler = (
  user: IUser,
  setChats: Dispatch<SetStateAction<IChat[] | null>>
) => {
  const onDragEnd = async (result: DropResult) => {
    const { destination, source } = result;
    if (!destination || destination.index === source.index) return;

    setChats((prevChats) => {
      const updatedChats = [...(prevChats as IChat[])];
      const [movedChat] = updatedChats.splice(source.index, 1);
      updatedChats.splice(destination.index, 0, movedChat);

      return updatedChats;
    });

    const userId = user?.uid;
    const chatRef = doc(db, `chats/${userId}`);

    try {
      const chatDoc = await getDoc(chatRef);
      if (!chatDoc.exists()) {
        console.error("Document does not exist!");
        return;
      }

      const chatData = chatDoc.data();
      const chatsArray: IChat[] = chatData.chats;

      const [movedChat] = chatsArray.splice(source.index, 1);
      chatsArray.splice(destination.index, 0, movedChat);

      chatsArray.forEach((chat, index) => {
        if (chat.isPin) {
          chat.order = index;
        }
      });

      await updateDoc(chatRef, { chats: chatsArray });
    } catch (error) {
      console.error("Error updating chat order:", error);
    }
  };

  return { onDragEnd };
};
