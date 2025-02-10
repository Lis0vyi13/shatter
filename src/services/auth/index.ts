import {
  AuthProvider,
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updatePassword,
  User,
} from "firebase/auth";
import { actionCodeSettings, auth } from "@/firebase/firebaseConfig";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { toast } from "sonner";

export type ProgressHandler = React.Dispatch<React.SetStateAction<number>>;

export const signInWithProvider = async (
  provider: AuthProvider,
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
  password: string,
): Promise<User | null> => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
};

export const createUserAccount = async (
  email: string,
  password: string,
  displayName: string,
  handleProgress: ProgressHandler,
) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    handleProgress(40);

    await updateProfile(user, { displayName });
    handleProgress(70);

    await sendEmailVerification(user, { url: actionCodeSettings.url + "c" });
    handleProgress(90);

    handleProgress(100);

    toast.info(
      "Verification email sent. Please confirm your email to continue.",
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error && "code" in error
        ? error.code === "auth/email-already-in-use"
          ? "This email is already in use. Please try another one."
          : error.message
        : "An unexpected error occurred.";

    toast.error(errorMessage);
    throw error;
  }
};

export const resetPassword = async (email: string): Promise<void> => {
  const auth = getAuth();

  const actionCodeSettings = {
    url: import.meta.env.VITE_APP_URL + "login",
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

export const updateUserPassword = (
  user: User | null,
  oldPassword: string,
  newPassword: string,
) => {
  if (!user || !user.email)
    throw new Error("User is not authenticated or email is missing");

  const credential = EmailAuthProvider.credential(user.email, oldPassword);

  reauthenticateWithCredential(user, credential)
    .then(() => {
      updatePassword(user, newPassword)
        .then(() => {
          console.log("Password updated successfully");
        })
        .catch((error) => {
          throw new Error(`Error updating password: ${error.message}`);
        });
    })
    .catch((error) => {
      throw new Error(`Incorrect old password: ${error.message}`);
    });
};
