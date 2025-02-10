import { RefObject } from "react";
import moment from "moment";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { User } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";

import { SelectedDate } from "@/components/ui/BirthdayPicker";

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
  ref: RefObject<HTMLElement>,
) => {
  if (e.key === "Enter" && ref.current) {
    ref.current.focus();
  }
};

export const scrollToChatLink = (
  wrapperRef: RefObject<HTMLElement>,
  activeChat: string,
) => {
  const targetElement = wrapperRef?.current?.querySelector<HTMLDivElement>(
    `a[href="/c/${activeChat}"]`,
  );
  if (targetElement) {
    targetElement.scrollIntoView({ block: "nearest" });
  }
};

export const getLanguage = (text: string) => {
  const cyrillicRegExp = /[а-яА-Я]/;

  if (cyrillicRegExp.test(text)) {
    return "ru";
  } else {
    return "en";
  }
};

export const getDaysInMonth = (month: number, year: number) => {
  if (month === 2) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28;
  }
  if ([4, 6, 9, 11].includes(month)) {
    return 30;
  }
  return 31;
};

export const getMonthNumber = (month: string) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (months.indexOf(month) + 1).toString().padStart(2, "0");
};

export const getFormattedBirthday = (date: SelectedDate) => {
  return `${date.day} ${date.month}, ${date.year}`;
};
