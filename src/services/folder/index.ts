import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

import { IFolder } from "@/types/sidebar";

export const getFolderById = async (
  folderId: string,
): Promise<IFolder | null> => {
  const folderDocRef = doc(db, "folders", folderId);
  const folderDoc = await getDoc(folderDocRef);

  if (!folderDoc.exists()) {
    return null;
  }

  return folderDoc.data() as IFolder;
};

export const getAllFolders = async (
  folderIds: string[],
): Promise<IFolder[]> => {
  if (!folderIds.length) {
    return [];
  }

  try {
    const foldersRef = collection(db, "folders");
    const foldersQuery = query(foldersRef, where("id", "in", folderIds));
    const querySnapshot = await getDocs(foldersQuery);

    return querySnapshot.docs.map((doc) => doc.data() as IFolder);
  } catch (error) {
    console.error("Error fetching folders:", error);
    return [];
  }
};
