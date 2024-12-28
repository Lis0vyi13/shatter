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

export const createUser = async (user: User) => {
  const userDocRef = doc(db, "users", user.uid);
  const userDoc = await getDoc(userDocRef);

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

  if (!userDoc.exists()) {
    await setDoc(userDocRef, userData);
  }

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

export const getUserById = async (uid: string): Promise<IUser | null> => {
  const userDocRef = doc(db, "users", uid);
  const userDoc = await getDoc(userDocRef);

  if (!userDoc.exists) {
    return null;
  }
  return userDoc.data() as IUser;
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
