import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";

export const changeUrlWithoutReload = (newUrl: string) => {
  window.history.pushState(null, "", newUrl);
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTimestamp = (timestamp: number) => {
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
