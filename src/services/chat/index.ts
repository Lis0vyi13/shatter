import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  runTransaction,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

import { IChat } from "@/types/chat";
import { IUser } from "@/types/user";

export const createChat = async (chatData: IChat) => {
  try {
    const chatDocRef = doc(db, "chats", chatData.id);
    await setDoc(chatDocRef, chatData);

    return { success: true, data: chatData };
  } catch (error) {
    console.error("Error creating chat:", error);
    return { success: false, error: "Failed to create chat." };
  }
};

export const createFavoritesChat = async (data: IChat | null) => {
  if (!data) return null;

  const chatDocRef = doc(db, "favorites", data.id);
  const chatDocSnap = await getDoc(chatDocRef);

  if (!chatDocSnap.exists()) {
    await setDoc(chatDocRef, data);
  }

  return chatDocSnap.data() as IChat;
};

export const getFavoriteChat = async (
  chatId: string
): Promise<IChat | null> => {
  try {
    const chatDocRef = doc(db, "favorites", chatId);
    const chatDocSnap = await getDoc(chatDocRef);

    if (!chatDocSnap.exists()) {
      return null;
    }

    return chatDocSnap.data() as IChat;
  } catch (error) {
    console.error("Error getting favorite chat:", error);
    return null;
  }
};

export const getChatById = async (chatId: string): Promise<IChat | null> => {
  try {
    const chatDocRef = doc(db, "chats", chatId);
    const chatDocSnap = await getDoc(chatDocRef);

    if (!chatDocSnap.exists()) {
      return null;
    }

    return chatDocSnap.data() as IChat;
  } catch (error) {
    console.error("Error getting chat by ID:", error);
    return null;
  }
};

export const getAllChats = async (chatsId: string[]): Promise<IChat[]> => {
  try {
    if (!chatsId.length) return [];

    const chatsRef = collection(db, "chats");
    const q = query(chatsRef, where("id", "in", chatsId));

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

export const togglePinChat = async (
  uid: string,
  chatId: string,
  collectionName: "favorites" | "chats" = "chats"
): Promise<void> => {
  await runTransaction(db, async (transaction) => {
    const chatDocRef = doc(db, collectionName, chatId);
    const chatDocSnap = await transaction.get(chatDocRef);

    if (!chatDocSnap.exists()) {
      throw new Error("Chat document does not exist.");
    }

    const chatData = chatDocSnap.data() as IChat;
    const isPinned = chatData.isPin?.includes(uid) ?? false;

    const updatedIsPin = isPinned
      ? chatData.isPin.filter((pinnedUid) => pinnedUid !== uid)
      : [...(chatData.isPin || []), uid];

    transaction.update(chatDocRef, { isPin: updatedIsPin });
  });
};

export const updateChatOrder = async (updatedPinnedChats: IChat) => {
  try {
    const chatRef = doc(db, "chats", updatedPinnedChats.id);
    await updateDoc(chatRef, { order: updatedPinnedChats.order });
  } catch (error) {
    console.error("Error updating chat order:", error);
    throw error;
  }
};

export const updateChatOrders = async (updatedPinnedChats: IChat[]) => {
  try {
    const batch = writeBatch(db);

    updatedPinnedChats.forEach((chat) => {
      const chatRef = doc(db, "chats", chat.id);
      batch.update(chatRef, { order: chat.order });
    });

    await batch.commit();

    console.log("Pinned chat orders updated successfully.");
  } catch (error) {
    console.error("Error updating pinned chat orders:", error);
    throw error;
  }
};

export const addChatToUser = async (uid: string, chatId: string) => {
  try {
    const userDocRef = doc(db, "users", uid);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      console.error(`User with uid ${uid} not found.`);
      return { success: false, error: "User not found." };
    }

    const userData = userDocSnap.data() as IUser;
    const existingChats = userData.chats || [];

    if (!existingChats.includes(chatId)) {
      const updatedChats = [...existingChats, chatId];
      await updateDoc(userDocRef, { chats: updatedChats });

      const updatedUserDocSnap = await getDoc(userDocRef);
      const updatedUser = updatedUserDocSnap.data() as IUser;

      return { success: true, updatedUser };
    } else {
      return { success: false, message: "Chat already added." };
    }
  } catch (error) {
    console.error("Error adding chat to user:", error);
    return { success: false, error: "Error adding chat to user." };
  }
};

export const deleteChat = async (uid: string, chatId: string) => {
  const batch = writeBatch(db);

  try {
    const userDocRef = doc(db, "users", uid);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      throw new Error(`User with uid ${uid} does not exist`);
    }

    const userData = userDocSnap.data() as IUser;
    const existingChats = userData.chats || [];

    if (!existingChats.includes(chatId)) {
      throw new Error("Chat not found in user's list");
    }

    const updatedChats = existingChats.filter((id) => id !== chatId);
    const chatDocRef = doc(db, "chats", chatId);

    batch.update(userDocRef, { chats: updatedChats });
    batch.delete(chatDocRef);

    await batch.commit();

    const updatedUserDocSnap = await getDoc(userDocRef);
    const updatedUser = updatedUserDocSnap.data() as IUser;

    return { success: true, updatedUser };
  } catch (error) {
    console.error("Error in deleteChat:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Error deleting chat from user",
    };
  }
};

export const fetchChats = async (userChats: string[]): Promise<IChat[]> => {
  if (!userChats || userChats.length === 0) return [];

  const chatsSnapshot = await getDocs(
    query(collection(db, "chats"), where("id", "in", userChats.slice(0, 30)))
  );

  return chatsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as IChat[];
};
