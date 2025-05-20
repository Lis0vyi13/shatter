"use client";

import { useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, dbRealtime } from "@/firebase/firebaseConfig";
import { ref, get } from "firebase/database";

import { createUser, monitorUserConnection } from "@/services/user";
import useActions from "./useActions";
import { createFavoritesChatTemplate } from "@/templates";
import { IUser } from "@/types/user";

export const useApp = () => {
  const { setUser } = useActions();

  useEffect(() => {
    const handleUserAuth = async (user: User | null) => {
      if (!user) {
        console.warn("No user authenticated.");
        return;
      }

      try {
        monitorUserConnection();
        await createUser(user);

        await createFavoritesChatTemplate(user.uid);

        const userRef = ref(dbRealtime, `users/${user.uid}`);
        const userSnapshot = await get(userRef);
        if (userSnapshot.exists()) {
          setUser(userSnapshot.val() as IUser);
        } else {
          console.error(`User with uid ${user.uid} not found.`);
        }
      } catch (error) {
        console.error("Error handling user authentication:", error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) =>
      handleUserAuth(user),
    );

    return () => {
      unsubscribe();
    };
  }, [setUser]);
};
