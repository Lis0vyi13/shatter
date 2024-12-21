"use client";

import { useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import {
  createTestFolder,
  createUser,
  monitorUserConnection,
} from "@/services/firebase";
import useActions from "./useActions";
import { generateFavoritesChatTemplate } from "@/templates";

export const useApp = () => {
  const { setUser } = useActions();

  useEffect(() => {
    const handleUserAuth = async (user: User | null) => {
      if (!user) {
        console.warn("No user authenticated.");
        return;
      }

      if (!user.emailVerified) {
        console.warn("User email is not verified.");
        return;
      }

      try {
        monitorUserConnection();

        const userData = await createUser(user);

        await Promise.all([
          generateFavoritesChatTemplate(user.uid),
          createTestFolder(),
        ]);

        setUser(userData);
      } catch (error) {
        console.error("Error handling user authentication:", error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) =>
      handleUserAuth(user)
    );

    return () => {
      unsubscribe();
    };
  }, [setUser]);
};
