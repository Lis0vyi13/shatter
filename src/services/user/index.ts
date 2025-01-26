import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { User } from "firebase/auth";
import { db, dbRealtime } from "@/firebase/firebaseConfig";
import { auth } from "@/firebase/firebaseConfig";
import {
  get,
  getDatabase,
  onDisconnect,
  onValue,
  ref,
  serverTimestamp,
  set,
} from "firebase/database";

import { IUser, IUserStatus } from "@/types/user";

export const createUser = async (user: User): Promise<IUser> => {
  const userDocRef = doc(db, "users", user.uid);

  try {
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      const userData: IUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "Anonymous",
        photoUrl: "",
        chats: [],
        folders: [],
        createdAt: Date.now(),
        favorites: "",
      };

      await setDoc(userDocRef, userData);
      return userData;
    }

    return userDoc.data() as IUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Error creating user. Please try again.");
  }
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

export const getUserById = async (uid: string): Promise<IUser | null> => {
  try {
    const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists) {
      console.error(`User with uid ${uid} not found.`);
      return null;
    }
    return userDoc.data() as IUser;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

export const searchUsersByDisplayName = async (
  searchTerm: string
): Promise<IUser[]> => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef);
    const querySnapshot = await getDocs(q);

    const lowerSearchTerm = searchTerm.toLowerCase();
    return querySnapshot.docs
      .map((doc) => doc.data() as IUser)
      .filter((userData) =>
        userData.displayName?.toLowerCase().includes(lowerSearchTerm)
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
