import { User } from "firebase/auth";
import { auth, dbRealtime, storage } from "@/firebase/firebaseConfig";
import {
  get,
  getDatabase,
  onDisconnect,
  onValue,
  ref,
  serverTimestamp,
  set,
  update,
} from "firebase/database";

import { ref as storageRef } from "firebase/storage";
import { IUser, IUserStatus } from "@/types/user";
import { getDownloadURL, uploadBytes } from "firebase/storage";

export const createUser = async (user: User): Promise<IUser> => {
  const userRef = ref(dbRealtime, `users/${user.uid}`);

  try {
    const userSnapshot = await get(userRef);
    if (!userSnapshot.exists()) {
      const userData: IUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "Anonymous",
        photoUrl: "",
        chats: [],
        folders: [],
        createdAt: Date.now(),
        favorites: "",
        banner: "",
        updatedAt: "",
        birthday: null,
        username: "@",
        phoneNumber: "",
      };

      await set(userRef, userData);
      return userData;
    }

    return userSnapshot.val() as IUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Error creating user. Please try again.");
  }
};

export const updateUser = async (uid: string, updatedData: Partial<IUser>) => {
  try {
    const userRef = ref(dbRealtime, `users/${uid}`);
    const userSnapshot = await get(userRef);

    if (!userSnapshot.exists()) {
      console.error(`User with uid ${uid} does not exist.`);
      return;
    }

    await update(userRef, updatedData);
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

export const getUserById = async (uid: string): Promise<IUser | null> => {
  try {
    const userRef = ref(dbRealtime, `users/${uid}`);
    const userSnapshot = await get(userRef);

    if (!userSnapshot.exists()) {
      console.error(`User with uid ${uid} not found.`);
      return null;
    }

    return userSnapshot.val() as IUser;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

export const searchUsersByDisplayName = async (
  searchTerm: string,
): Promise<IUser[]> => {
  try {
    const usersRef = ref(dbRealtime, "users");
    const usersSnapshot = await get(usersRef);

    if (!usersSnapshot.exists()) {
      return [];
    }

    const lowerSearchTerm = searchTerm.toLowerCase();
    const usersData = usersSnapshot.val() as Record<string, IUser>;

    return Object.values(usersData).filter((userData) =>
      userData.displayName?.toLowerCase().includes(lowerSearchTerm),
    );
  } catch (error) {
    console.error("Error searching users:", error);
    return [];
  }
};

export const getUserStatus = async (uid: string) => {
  const userStatusDatabaseRef = ref(dbRealtime, `/status/${uid}`);

  try {
    const snapshot = await get(userStatusDatabaseRef);

    if (snapshot.exists()) {
      return snapshot.val() as IUserStatus;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching user status:", error);
    return null;
  }
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
          onDisconnect(userStatusDatabaseRef).set(isOfflineForDatabase);
        } else {
          await set(userStatusDatabaseRef, isOfflineForDatabase);
        }
      } catch (error) {
        console.error("Error updating user status:", error);
      }
    });
  }
};

export const uploadImage = async (
  file: File,
  uid: string,
  type: "avatar" | "banner",
): Promise<string> => {
  const fileRef = storageRef(storage, `users/${uid}/${type}-${Date.now()}`);
  await uploadBytes(fileRef, file);
  return await getDownloadURL(fileRef);
};
