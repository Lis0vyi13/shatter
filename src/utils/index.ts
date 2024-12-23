import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";
import { get, ref } from "firebase/database";
import { dbRealtime } from "@/firebase/firebaseConfig";
import { IUserStatus } from "@/types/user";

export const changeUrlWithoutReload = (newUrl: string) => {
  window.history.pushState(null, "", newUrl);
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTimestampToDate = (timestamp: number) => {
  const now = moment();
  const date = moment(timestamp);

  if (date.isSame(now, "day")) {
    return date.format("HH:mm");
  } else if (date.isAfter(now.subtract(1, "week"))) {
    return date.format("ddd");
  } else {
    return date.format("DD.MM.YYYY");
  }
};

export const getInitials = (name: string) => {
  return name?.split(" ").reduce((acum, curr) => (acum += curr[0]), "");
};

export const getUserStatus = async (uid: string) => {
  const userStatusDatabaseRef = ref(dbRealtime, `/status/${uid}`);

  try {
    const snapshot = await get(userStatusDatabaseRef);

    if (snapshot.exists()) {
      return snapshot.val() as IUserStatus;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching user status:", error);
    return null;
  }
};

export const getTimeAgo = (timestamp: number): string => {
  return moment(timestamp).fromNow();
};
