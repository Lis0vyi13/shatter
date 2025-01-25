import { Dispatch, SetStateAction } from "react";

import { createUserAccount } from "@/services/auth";

type TSignUpAction = (
  formData: FormData,
  setProgressValue: Dispatch<SetStateAction<number>>,
  setIsSubmitted: Dispatch<SetStateAction<boolean>>
) => Promise<{
  username: string | null;
  email: string | null;
  password: string | null;
}>;

export const signUpAction: TSignUpAction = async (
  formData,
  setProgressValue,
  setIsSubmitted
) => {
  const data = {
    username: formData.get("email") as string | null,
    email: formData.get("email") as string | null,
    password: formData.get("password") as string | null,
  };

  if (!data.username || !data.email || !data.password) {
    console.error("Missing required fields!");
    return data;
  }

  await new Promise((resolve) => {
    setTimeout(() => {
      setIsSubmitted(true);
      resolve(null);
    }, 100);
  });

  try {
    await createUserAccount(
      data.email,
      data.password,
      data.username,
      setProgressValue
    );
  } catch (error) {
    console.error("Error during sign-up:", error);
  } finally {
    setTimeout(() => {
      setIsSubmitted(false);
      setProgressValue(0);
    }, 500);
  }

  return data;
};
