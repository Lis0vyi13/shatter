import {
  AuthProvider,
  getAuth,
  sendPasswordResetEmail,
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
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred.";
    toast.error(errorMessage);
    throw error;
  }
};

export const resetPassword = async (email: string): Promise<void> => {
  const auth = getAuth();

  const actionCodeSettings = {
    url: process.env.NEXT_PUBLIC_APP_URL + "login",
    handleCodeInApp: false,
  };

  try {
    await sendPasswordResetEmail(auth, email, actionCodeSettings);
    toast.info("Password reset email sent. Please check your inbox.");
  } catch (error) {
    const firebaseError = error as { code: string; message: string };

    const errorMessage =
      {
        "auth/user-not-found": "No account found with this email address.",
        "auth/invalid-email": "Please enter a valid email address.",
        "auth/too-many-requests": "Too many attempts. Please try again later.",
      }[firebaseError.code] || "Failed to send reset email. Please try again.";

    toast.error(errorMessage);
    throw error;
  }
};
