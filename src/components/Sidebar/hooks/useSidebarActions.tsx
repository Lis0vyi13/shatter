import { SetStateAction, useCallback, useState } from "react";
import { ref, set } from "firebase/database";
import { signOut } from "firebase/auth";
import { auth, dbRealtime } from "@/firebase/firebaseConfig";

import useActions from "@/hooks/useActions";

import { IFolder } from "@/types/sidebar";

const useSidebarActions = (
  setSidebarItems: (value: SetStateAction<IFolder[]>) => void
) => {
  const {
    logout,
    setChats,
    setFavorites,
    setSearchInputValue,
    setDebouncedSearchInputValue,
    setActiveChat,
  } = useActions();
  const [loading, setLoading] = useState(false);

  const handleItemClick = useCallback(
    (folderId: string) => {
      setSidebarItems((prevItems) =>
        prevItems.map((item) =>
          item.id === folderId
            ? { ...item, isActive: true }
            : { ...item, isActive: false }
        )
      );
    },
    [setSidebarItems]
  );

  const handleLogoClick = () => {
    setSearchInputValue("");
    setDebouncedSearchInputValue("");
    setActiveChat("");
  };

  const handleLogout = async () => {
    setLoading(true);

    try {
      logout();
      await signOut(auth);
      setChats(null);
      setFavorites(null);
      setActiveChat("");

      const currentUser = auth.currentUser;

      if (currentUser) {
        const userStatusRef = ref(dbRealtime, `/status/${currentUser.uid}`);
        const isOfflineForDatabase = {
          state: "offline",
          updatedAt: Date.now(),
        };

        await set(userStatusRef, isOfflineForDatabase);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setLoading(false);
    }
  };

  return { handleItemClick, handleLogoClick, handleLogout, loading };
};

export default useSidebarActions;
