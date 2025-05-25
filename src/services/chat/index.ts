import { dbRealtime } from "@/firebase/firebaseConfig";
import { Message } from "@/hooks/useChat";
import { IChat } from "@/types/chat";
import { IUser } from "@/types/user";
import {
  get,
  push,
  ref,
  remove,
  serverTimestamp,
  set,
  update,
} from "firebase/database";

export const createChat = async (chatData: IChat) => {
  try {
    const data: IChat = { ...chatData, chatType: "individual", isPin: [] };
    const chatRef = ref(dbRealtime, `chats/${chatData.id}`);
    await set(chatRef, data);

    return { success: true, data: data };
  } catch (error) {
    console.error("Error creating chat:", error);
    return { success: false, error: "Failed to create chat." };
  }
};

export const sendMessage = async (
  senderId: string,
  receiverId: string,
  text: string,
  chatId: string,
) => {
  const chatRef = ref(dbRealtime, `chats/${chatId}`);

  await update(chatRef, {
    members: { [senderId]: true, [receiverId]: true },
    lastMessage: { text, timestamp: serverTimestamp(), senderId },
  });

  const messagesRef = ref(dbRealtime, `messages/${chatId}`);
  await push(messagesRef, {
    senderId,
    receiverId,
    text,
    timestamp: serverTimestamp(),
    type: "text",
  });
  try {
    const userRef = ref(dbRealtime, `users/${receiverId}`);
    const userSnapshot = await get(userRef);
    if (userSnapshot.exists()) {
      const userData = userSnapshot.val();
      const userChats = Array.isArray(userData.chats) ? userData.chats : [];

      if (!userChats.includes(chatId)) {
        await addChatToUser(receiverId, chatId);
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export const createFavoritesChat = async (data: IChat | null) => {
  if (!data) return null;

  const chatRef = ref(dbRealtime, `favorites/${data.id}`);
  const chatSnapshot = await get(chatRef);

  if (!chatSnapshot.exists()) {
    await set(chatRef, data);
  }

  const chatData = chatSnapshot.val();
  return chatData as IChat;
};

export const getFavoriteChat = async (
  chatId: string,
): Promise<IChat | null> => {
  try {
    const chatRef = ref(dbRealtime, `favorites/${chatId}`);
    const chatSnapshot = await get(chatRef);

    if (!chatSnapshot.exists()) {
      return null;
    }

    return chatSnapshot.val() as IChat;
  } catch (error) {
    console.error("Error getting favorite chat:", error);
    return null;
  }
};

export const getChatById = async (chatId: string): Promise<IChat | null> => {
  try {
    const chatRef = ref(dbRealtime, `chats/${chatId}`);
    const chatSnapshot = await get(chatRef);

    if (!chatSnapshot.exists()) {
      return null;
    }
    return chatSnapshot.val() as IChat;
  } catch (error) {
    console.error("Error getting chat by ID:", error);
    return null;
  }
};

export const togglePinChat = async (
  uid: string,
  chatId: string,
  collectionName: "favorites" | "chats" = "chats",
): Promise<void> => {
  const chatRef = ref(dbRealtime, `${collectionName}/${chatId}`);

  const chatSnapshot = await get(chatRef);

  if (!chatSnapshot.exists()) {
    throw new Error("Chat document does not exist.");
  }

  const chatData: IChat = chatSnapshot.val();

  const isPin = Array.isArray(chatData.isPin) ? chatData.isPin : [];
  const isPinned = isPin.includes(uid);

  const updatedIsPin = isPinned
    ? isPin.filter((pinnedUid) => pinnedUid !== uid)
    : [...isPin, uid];

  const updatedChatData = {
    ...chatData,
    isPin: updatedIsPin,
  };

  await set(chatRef, updatedChatData);
};

export const updateChatOrder = async (updatedPinnedChats: IChat) => {
  try {
    const chatRef = ref(dbRealtime, `chats/${updatedPinnedChats.id}`);
    await update(chatRef, { order: updatedPinnedChats.order });
  } catch (error) {
    console.error("Error updating chat order:", error);
    throw error;
  }
};

export const updateChatOrders = async (updatedPinnedChats: IChat[]) => {
  try {
    const updates: Record<string, unknown> = {};

    updatedPinnedChats.forEach((chat) => {
      updates[`chats/${chat.id}/order`] = chat.order;
    });

    await update(ref(dbRealtime), updates);
  } catch (error) {
    console.error("Error updating pinned chat orders:", error);
    throw error;
  }
};

export const addChatToUser = async (uid: string, chatId: string) => {
  try {
    const userRef = ref(dbRealtime, `users/${uid}`);
    const userSnapshot = await get(userRef);

    if (!userSnapshot.exists()) {
      console.error(`User with uid ${uid} not found.`);
      return { success: false, error: "User not found." };
    }

    const userData = userSnapshot.val() as IUser;
    const existingChats: string[] = Array.isArray(userData.chats)
      ? userData.chats
      : [];

    if (!existingChats.includes(chatId)) {
      const updatedChats = [...existingChats, chatId];
      await update(userRef, { chats: updatedChats });

      const updatedUserSnapshot = await get(userRef);
      const updatedUser = updatedUserSnapshot.val() as IUser;

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
  try {
    const userRef = ref(dbRealtime, `users/${uid}`);
    const userSnapshot = await get(userRef);

    if (!userSnapshot.exists()) {
      throw new Error(`User with uid ${uid} does not exist`);
    }

    const userData = userSnapshot.val() as IUser;
    const existingChats = userData.chats || [];

    if (!existingChats.includes(chatId)) {
      throw new Error("Chat not found in user's list");
    }

    const updatedChats = existingChats.filter((id) => id !== chatId);

    const updates: Record<string, unknown> = {};
    updates[`users/${uid}/chats`] = updatedChats;
    updates[`chats/${chatId}`] = null;

    await update(ref(dbRealtime), updates);

    const updatedUserSnapshot = await get(userRef);
    const updatedUser = updatedUserSnapshot.val() as IUser;

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

  const chats: IChat[] = [];
  const chatPromises = userChats.slice(0, 30).map(async (chatId) => {
    const chatRef = ref(dbRealtime, `chats/${chatId}`);
    const chatSnapshot = await get(chatRef);
    if (chatSnapshot.exists()) {
      const chatData = chatSnapshot.val();
      chats.push({
        id: chatId,
        ...chatData,
      });
    }
  });

  await Promise.all(chatPromises);
  return chats;
};

export const deleteMessage = async (chatId: string, messageId: string) => {
  const messagesRef = ref(dbRealtime, `messages/${chatId}`);

  const snapshot = await get(messagesRef);
  if (!snapshot.exists()) return;

  const messagesData = snapshot.val() as Record<string, Omit<Message, "id">>;

  const messagesArray: Message[] = Object.entries(messagesData).map(
    ([id, data]) => ({
      id,
      ...data,
    }),
  );

  const messageToDelete = ref(dbRealtime, `messages/${chatId}/${messageId}`);
  await remove(messageToDelete);

  const remainingMessages = messagesArray
    .filter((msg) => msg.id !== messageId)
    .sort((a, b) => b.timestamp - a.timestamp);

  const chatRef = ref(dbRealtime, `chats/${chatId}`);
  if (remainingMessages.length > 0) {
    const last = remainingMessages[0];
    await update(chatRef, {
      lastMessage: {
        text: last.text,
        timestamp: last.timestamp,
        senderId: last.senderId,
      },
    });
  } else {
    await update(chatRef, {
      lastMessage: null,
    });
  }
};

export const clearChatHistory = async (chatId: string) => {
  try {
    const messagesRef = ref(dbRealtime, `messages/${chatId}`);
    await remove(messagesRef);

    const chatRef = ref(dbRealtime, `chats/${chatId}`);
    await update(chatRef, {
      lastMessage: null,
    });

    return { success: true };
  } catch (error) {
    console.error("Error clearing chat history:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unknown error while clearing chat history",
    };
  }
};
