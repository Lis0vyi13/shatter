import { useState } from "react";

import { getMonthNumber } from "@/utils";
import { toast } from "sonner";
import { updateUser } from "@/services/user";
import useActions from "@/hooks/useActions";

import { SelectedDate } from "@/components/ui/BirthdayPicker";

import { IUser } from "@/types/user";

export const getDateFromTimestamp = (
  timestamp: number | null,
): SelectedDate | null => {
  if (!timestamp) return null;
  const date = new Date(timestamp);

  const day = date.getDate().toString();
  const year = date.getFullYear().toString();
  const monthNames = [
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
  const month = monthNames[date.getMonth()];

  return { day, month, year };
};

const getTimestampFromDate = (birthday: SelectedDate) => {
  const monthNumber = getMonthNumber(birthday.month);
  const date = new Date(`${birthday.year}-${monthNumber}-${birthday.day}`);
  return date.getTime();
};

interface IData {
  displayName: string;
  username: string;
  birthday: number | null;
  phoneNumber: string;
  [key: string]: string | number | null;
}

const useEditProfileForm = (onSubmit: () => void, user: IUser | null) => {
  const today = new Date();
  today.setHours(2, 0, 0, 0);

  const initialBirthday = user?.birthday
    ? getDateFromTimestamp(user.birthday)
    : null;

  const initialData: IData = {
    displayName: user?.displayName || "",
    username: user?.username || "@",
    birthday: user?.birthday || null,
    phoneNumber: user?.phoneNumber || "",
  };
  const [name, setName] = useState(user?.displayName || "");
  const [username, setUsername] = useState(user?.username || "@");
  const [birthday, setBirthday] = useState<SelectedDate | null>(
    initialBirthday,
  );
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useActions();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsLoading(true);

    const currentData: IData = {
      displayName: name,
      username,
      birthday: birthday ? getTimestampFromDate(birthday) : null,
      phoneNumber,
    };

    const shouldUpdate = Object.keys(initialData).some((key) => {
      return initialData[key] !== currentData[key];
    });

    if (!shouldUpdate) {
      toast.success("Updated successfully");
      setIsLoading(false);
      onSubmit();
      return;
    }

    try {
      const updatedData = { ...user, ...currentData };
      await updateUser(user.uid, updatedData);
      setUser(updatedData);
      toast.success("Updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update. Please try again.");
    } finally {
      setIsLoading(false);
      onSubmit();
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    const isValid = /^[A-Za-z0-9]*$/.test(value.replace(/@/g, ""));

    if (!isValid) {
      return;
    }

    if (!value.startsWith("@")) {
      value = "@" + value.replace(/@/g, "");
    }

    setUsername(value);
  };

  return {
    username,
    handleUsernameChange,
    birthday,
    setBirthday,
    phoneNumber,
    setPhoneNumber,
    name,
    setName,
    handleSubmit,
    isLoading,
  };
};

export default useEditProfileForm;
