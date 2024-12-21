"use client";

import { useCallback, useEffect, useState } from "react";

import { ref, set } from "firebase/database";
import { signOut } from "firebase/auth";
import { auth, dbRealtime } from "@/firebase/firebaseConfig";

import useActions from "@/hooks/useActions";
import useUser from "@/hooks/useUser";

import { sidebarIcons, userEditIcons } from "@/constants";

import { IFolder, IUserEditIcons } from "@/types/sidebar";
import { FaFolder } from "react-icons/fa";
import { getAllFolders } from "@/services/firebase";

const useSidebar = (folders: IFolder[] | null) => {
  const { logout, setFolders } = useActions();
  const [icons, setIcons] =
    useState<(IFolder | IUserEditIcons)[]>(sidebarIcons);
  const user = useUser();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFolders = async () => {
      if (user) {
        const folders = await getAllFolders(user.folders);
        setFolders(folders);
      }
    };
    fetchFolders();
  }, [setFolders, user]);

  useEffect(() => {
    const updateIcons = async () => {
      if (folders) {
        const updatedFolders: IFolder[] = folders.map((folder) => ({
          ...folder,
          to: "/" + folder.id,
          Icon: <FaFolder />,
        }));

        setIcons(() => {
          const addedChats = [
            sidebarIcons[0],
            ...updatedFolders,
            sidebarIcons[1],
          ];
          const userSettingsIcons = userEditIcons.map((icon, i) => ({
            ...icon,
            id: (i + addedChats.length).toString(),
          }));
          const allChats = [...addedChats, ...userSettingsIcons];
          return allChats;
        });
      }
    };

    updateIcons();
  }, [folders]);

  const handleIconClick = useCallback((index: string) => {
    setIcons((prevIcons) =>
      prevIcons.map((icon) =>
        icon.id === index && !icon.isActive
          ? { ...icon, isActive: true }
          : { ...icon, isActive: false }
      )
    );
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    logout();
    signOut(auth);

    const user = auth.currentUser;

    if (user) {
      const userStatusDatabaseRef = ref(dbRealtime, `/status/${user.uid}`);
      const currentTimestamp = Date.now();

      const isOfflineForDatabase = {
        state: "offline",
        updatedAt: currentTimestamp,
      };

      try {
        await set(userStatusDatabaseRef, isOfflineForDatabase);
      } catch (error) {
        console.error("Error updating status or signing out:", error);
      }
    } else {
    }
  };

  return { icons, handleIconClick, handleLogout, loading };
};

export default useSidebar;
