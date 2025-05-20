import { useState, useEffect } from "react";

import { getAllFolders } from "@/services/folder";

import useActions from "@/hooks/useActions";
import useUser from "@/hooks/useUser";

import { sidebarIcons } from "@/constants";
import { IFolder } from "@/types/sidebar";

const useSidebarItems = (initialFolders: IFolder[] | null) => {
  const [sidebarItems, setSidebarItems] = useState<IFolder[]>([]);
  const { setFolders } = useActions();
  const user = useUser();

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
          localStorage.setItem("folders", JSON.stringify(fetchedFolders));
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
          fullSidebarItems = [sidebarIcons[0], ...parsedFolders];
        } catch (error) {
          console.error("Invalid data in localStorage:", error);
        }
      } else if (initialFolders) {
        const transformedFolders = initialFolders.map((folder) => ({
          ...folder,
          href: `/${folder.id}`,
        }));
        fullSidebarItems = [sidebarIcons[0], ...transformedFolders];
        localStorage.setItem("folders", JSON.stringify(transformedFolders));
      }

      setSidebarItems(fullSidebarItems);
    };

    generateSidebarItems();
  }, [initialFolders]);

  return { sidebarItems, setSidebarItems };
};

export default useSidebarItems;
