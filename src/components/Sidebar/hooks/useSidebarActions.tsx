import { useState } from "react";
import { ref, set } from "firebase/database";
import { signOut } from "firebase/auth";
import { auth, dbRealtime } from "@/firebase/firebaseConfig";

import useActions from "@/hooks/useActions";

const useSidebarActions = () => {
  const {
    logout,
    setChats,
    setFavorites,
    setSearchInputValue,
    setDebouncedSearchInputValue,
    setActiveChat,
    setOnlineParticipants,
  } = useActions();
  const [loading, setLoading] = useState(false);

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
      setOnlineParticipants(null);

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

  return { handleLogoClick, handleLogout, loading };
};

export default useSidebarActions;
