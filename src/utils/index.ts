import { RefObject } from "react";

import { User } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";

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

export const getTimeAgo = (timestamp: number): string => {
  return moment(timestamp).fromNow();
};

export const isGoogleProviderLinked = (user: User | null): boolean => {
  return user
    ? user.providerData.some((provider) => provider.providerId === "google.com")
    : false;
};

export const shouldRedirect = () => {
  const user = auth.currentUser;
  const hasGoogleProvider = isGoogleProviderLinked(user);
  return (
    (hasGoogleProvider || user?.emailVerified) &&
    !localStorage.getItem("googleUserData")
  );
};

export const handleEnterKey = (
  e: React.KeyboardEvent,
  ref: RefObject<HTMLElement>
) => {
  if (e.key === "Enter" && ref.current) {
    ref.current.focus();
  }
};
