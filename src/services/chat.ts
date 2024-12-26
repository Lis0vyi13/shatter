import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

import { IChat } from "@/types/chat";

export const createFavoritesChat = async (data: IChat | null) => {
  if (data) {
    const chatDocRef = doc(db, "favorites", data.id);
    const chatDoc = await getDoc(chatDocRef);

    if (!chatDoc.exists()) {
      await setDoc(chatDocRef, data);
    }
    const updatedChatDoc = await getDoc(chatDocRef);

    return updatedChatDoc.data();
  }
};

export const createChat = async (chatData: IChat) => {
  try {
    const chatDocRef = doc(db, "chats", chatData.id);

    await setDoc(chatDocRef, chatData);

    return { success: true, data: chatData };
  } catch (error) {
    console.error("Ошибка при создании чата:", error);
    return { success: false, error };
  }
};

export const getChatById = async (chatId: string): Promise<IChat | null> => {
  const chatDocRef = doc(db, "chats", chatId);
  const chatDoc = await getDoc(chatDocRef);

  if (!chatDoc.exists()) {
    return null;
  }

  return chatDoc.data() as IChat;
};

export const getAllChats = async (chatsId: string[]): Promise<IChat[]> => {
  try {
    if (!chatsId.length) return [];

    const chatsRef = collection(db, "chats");
    const q = query(chatsRef, where("id", "in", chatsId.slice(0, 10)));

    const snapshot = await getDocs(q);
    const chats = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as IChat[];

    return chats;
  } catch (error) {
    console.error("Error fetching all chats:", error);
    return [];
  }
};

export const getFavoriteChat = async (chatId: string): Promise<IChat> => {
  const chatDocRef = doc(db, "favorites", chatId);
  const chatDoc = await getDoc(chatDocRef);

  return chatDoc.data() as IChat;
};

export const togglePinChat = async (
  uid: string,
  chatId: string,
  collection: "favorites" | "chats" = "chats"
): Promise<IChat | null> => {
  try {
    const chatDocRef = doc(db, collection, chatId);

    const chatDocSnap = await getDoc(chatDocRef);

    if (!chatDocSnap.exists()) {
      console.error("Chat document does not exist.");
      return null;
    }

    const chatData = chatDocSnap.data() as IChat;

    const isPinned = chatData.isPin.includes(uid);

    const updatedIsPin = isPinned
      ? chatData.isPin.filter((pinnedUid) => pinnedUid !== uid)
      : [...chatData.isPin, uid];

    await updateDoc(chatDocRef, { isPin: updatedIsPin });

    const updatedChatDocSnap = await getDoc(chatDocRef);

    return updatedChatDocSnap.exists()
      ? (updatedChatDocSnap.data() as IChat)
      : null;
  } catch (error) {
    console.error("Error toggling chat pin state:", error);
    return null;
  }
};
