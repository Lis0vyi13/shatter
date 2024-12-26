"use client";

import { useCallback, useEffect, useState } from "react";
import { ref, set } from "firebase/database";
import { signOut } from "firebase/auth";
import { auth, dbRealtime } from "@/firebase/firebaseConfig";

import useActions from "@/hooks/useActions";
import useUser from "@/hooks/useUser";
import { getAllFolders } from "@/services/folder";

import { sidebarIcons } from "@/constants";

import { IFolder } from "@/types/sidebar";

const useSidebar = (initialFolders: IFolder[] | null) => {
  const { logout, setFolders } = useActions();
  const [sidebarItems, setSidebarItems] = useState<IFolder[]>([]);
  const user = useUser();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadStoredFolders = () => {
      const storedFolders = localStorage.getItem("folders");
      if (storedFolders) {
        try {
          const parsedFolders = JSON.parse(storedFolders);
          setSidebarItems([sidebarIcons[0], ...parsedFolders, sidebarIcons[1]]);
        } catch (error) {
          console.error("Invalid data in localStorage:", error);
        }
      }
    };

    loadStoredFolders();
  }, []);

  useEffect(() => {
    const fetchFolders = async () => {
      if (user && user.folders) {
        try {
          const fetchedFolders = await getAllFolders(user.folders);
          setFolders(fetchedFolders);
          const transformedFolders = fetchedFolders.map((folder) => ({
            ...folder,
            href: `/${folder.id}`,
          }));
          localStorage.setItem("folders", JSON.stringify(transformedFolders));
        } catch (error) {
          console.error("Error fetching folders:", error);
        }
      }
    };

    fetchFolders();
  }, [setFolders, user]);

  useEffect(() => {
    const generateSidebarItems = () => {
      const storedFolders = localStorage.getItem("folders");

      let fullSidebarItems: IFolder[] = [];
      if (storedFolders) {
        try {
          const parsedFolders = JSON.parse(storedFolders);
          fullSidebarItems = [
            sidebarIcons[0],
            ...parsedFolders,
            sidebarIcons[1],
          ];
        } catch (error) {
          console.error("Invalid data in localStorage:", error);
        }
      } else if (initialFolders) {
        const transformedFolders = initialFolders.map((folder) => ({
          ...folder,
          href: `/${folder.id}`,
        }));
        fullSidebarItems = [
          sidebarIcons[0],
          ...transformedFolders,
          sidebarIcons[1],
        ];
        localStorage.setItem("folders", JSON.stringify(transformedFolders));
      }

      setSidebarItems(fullSidebarItems);
    };

    generateSidebarItems();
  }, [initialFolders]);

  const handleItemClick = useCallback((folderId: string) => {
    setSidebarItems((prevItems) =>
      prevItems.map((item) =>
        item.id === folderId
          ? { ...item, isActive: true }
          : { ...item, isActive: false }
      )
    );
  }, []);

  const handleLogout = async () => {
    setLoading(true);

    try {
      logout();
      await signOut(auth);

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

  return { sidebarItems, handleItemClick, handleLogout, loading };
};

export default useSidebar;
