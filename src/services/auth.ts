import {
  AuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
} from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { toast } from "sonner";

export type ProgressHandler = React.Dispatch<React.SetStateAction<number>>;

export const signInWithProvider = async (
  provider: AuthProvider
): Promise<User | null> => {
  try {
    const { user } = await signInWithPopup(auth, provider);
    return user;
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      console.error("Unexpected error during social sign-in:", error);
    }
    return null;
  }
};

export const signInWithEmail = async (
  email: string,
  password: string
): Promise<User | null> => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    throw error;
  }
};

export const createUserAccount = async (
  email: string,
  password: string,
  displayName: string,
  handleProgress: ProgressHandler
) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 0));

    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(user, { displayName });

    const progressSteps = [33, 66, 90, 100];
    for (const progress of progressSteps) {
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          handleProgress(progress);
          resolve();
        }, 600);
      });
    }

    toast.success("You have successfully logged in!");
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("An unexpected error occurred. Please try again.");
    }
    throw error;
  }
};
