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
import { User } from "firebase/auth";
import { db } from "@/firebase/firebaseConfig";
import { auth } from "@/firebase/firebaseConfig";
import {
  getDatabase,
  onDisconnect,
  onValue,
  ref,
  serverTimestamp,
  set,
} from "firebase/database";

import { IUser } from "@/types/user";
import { IChat } from "@/types/chat";
import { IFolder } from "@/types/sidebar";

export const createUser = async (user: User) => {
  const userDocRef = doc(db, "users", user.uid);
  const userDoc = await getDoc(userDocRef);

  const userData: IUser = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName || "Anonymous",
    photoUrl: "",
    emailVerified: user.emailVerified,
    chats: [],
    folders: [],
    createdAt: Date.now(),
    favorites: "",
  };

  if (!userDoc.exists()) {
    await setDoc(userDocRef, userData);
  }
  // else {
  //   await updateDoc(userDocRef, {
  //     email: userData.email,
  //     displayName: userData.displayName,
  //     // searchableTokens: user.displayName?.toLowerCase().split(" ") || [],
  //     photoUrl: userData.photoUrl,
  //     emailVerified: userData.emailVerified,
  //   });
  return userDoc.exists() ? (userDoc.data() as IUser) : userData;
};

export const updateUser = async (uid: string, updatedData: Partial<IUser>) => {
  try {
    const userDocRef = doc(db, "users", uid);

    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      console.error(`User with uid ${uid} does not exist.`);
      return;
    }

    await updateDoc(userDocRef, updatedData);

    console.log(`User with uid ${uid} successfully updated.`);
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

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

export const getUserById = async (uid: string): Promise<IUser | null> => {
  const userDocRef = doc(db, "users", uid);
  const userDoc = await getDoc(userDocRef);

  if (!userDoc.exists) {
    return null;
  }
  return userDoc.data() as IUser;
};

export const getChatById = async (chatId: string): Promise<IChat | null> => {
  const chatDocRef = doc(db, "chats", chatId);
  const chatDoc = await getDoc(chatDocRef);

  if (!chatDoc.exists()) {
    return null;
  }

  return chatDoc.data() as IChat;
};

export const getFolderById = async (
  folderId: string
): Promise<IFolder | null> => {
  const folderDocRef = doc(db, "folders", folderId);
  const folderDoc = await getDoc(folderDocRef);

  if (!folderDoc.exists()) {
    return null;
  }

  return folderDoc.data() as IFolder;
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

export const getAllFolders = async (
  foldersId: string[]
): Promise<IFolder[]> => {
  const folders = await Promise.all(
    foldersId.map(async (id) => {
      const chat = await getFolderById(id);
      return chat;
    })
  );
  return folders.filter((folder) => folder !== null);
};

export const getFavoriteChat = async (chatId: string): Promise<IChat> => {
  const chatDocRef = doc(db, "favorites", chatId);
  const chatDoc = await getDoc(chatDocRef);

  return chatDoc.data() as IChat;
};

export const searchByDisplayName = async (
  searchTerm: string
): Promise<IUser[]> => {
  try {
    const usersRef = collection(db, "users");
    const lowerSearchTerm = searchTerm.toLowerCase();

    const q = query(usersRef);
    const querySnapshot = await getDocs(q);

    const users: IUser[] = [];
    querySnapshot.forEach((doc) => {
      const userData = doc.data() as IUser;
      const isMatch = userData.displayName
        ?.toLowerCase()
        .includes(lowerSearchTerm);

      if (isMatch) users.push(userData);
    });

    return users;
  } catch (error) {
    console.error("Error searching users:", error);
    return [];
  }
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

export const getUserStatus = (uid: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const dbRealtime = getDatabase();
    const userStatusDatabaseRef = ref(dbRealtime, `/status/${uid}`);

    onValue(userStatusDatabaseRef, (snapshot) => {
      if (snapshot.exists()) {
        const userStatus = snapshot.val();
        resolve(userStatus.state);
      } else {
        reject(new Error(`${uid} status is not available`));
      }
    });
  });
};

export const monitorUserConnection = () => {
  const dbRealtime = getDatabase();
  const user = auth.currentUser;

  if (user) {
    const userStatusDatabaseRef = ref(dbRealtime, `/status/${user.uid}`);

    const isOfflineForDatabase = {
      state: "offline",
      updatedAt: serverTimestamp(),
    };

    const isOnlineForDatabase = {
      state: "online",
      updatedAt: serverTimestamp(),
    };

    const connectedRef = ref(dbRealtime, ".info/connected");
    onValue(connectedRef, async (snapshot) => {
      try {
        if (snapshot.val() === true) {
          await set(userStatusDatabaseRef, isOnlineForDatabase);

          onDisconnect(userStatusDatabaseRef)
            .set(isOfflineForDatabase)
            .catch((error) => {
              console.error("Error setting onDisconnect:", error);
            });
        } else {
          await set(userStatusDatabaseRef, isOfflineForDatabase);
        }
      } catch (error) {
        console.error("Error updating user status:", error);
      }
    });
  }
};
