"use client";

import { useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";

import {
  createFavoritesChat,
  createOrUpdateUser,
  createTestFolder,
} from "@/services/firebase";
import { monitorUserConnection } from "@/services/firebase";
import useActions from "./useActions";

import { generateFavoritesChatTemplate } from "@/templates";

export const useApp = () => {
  const { setUser } = useActions();

  useEffect(() => {
    const handleUserAuth = async (user: User | null) => {
      if (!user || !user.emailVerified) return;

      monitorUserConnection();

      try {
        const userData = await createOrUpdateUser(user);

        const favoritesChat = generateFavoritesChatTemplate(user.uid);
        await createFavoritesChat(favoritesChat, user.uid);
        await createTestFolder(user);

        setUser(userData);
      } catch (error) {
        console.error("Error handling user authentication:", error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, handleUserAuth);

    return () => unsubscribe();
  }, [setUser]);
};
