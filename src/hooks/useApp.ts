"use client";

import { useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "@/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

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

        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        setUser(userDoc.data() as IUser);
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
