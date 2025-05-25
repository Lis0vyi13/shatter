import { auth, dbRealtime } from "@/firebase/firebaseConfig";
import { FirebaseError } from "firebase/app";
import {
  linkWithCredential,
  EmailAuthProvider,
  updateProfile,
} from "firebase/auth";
import { ref, update } from "firebase/database";
import { toast } from "sonner";

interface LinkPasswordForm {
  username: string;
  password: string;
}

export const linkGoogleWithPassword = async ({
  username,
  password,
}: LinkPasswordForm) => {
  const storedUserData = localStorage.getItem("googleUserData");
  const userData = storedUserData ? JSON.parse(storedUserData) : null;

  if (!userData?.email) {
    toast.error("Please sign up using Google first.");
    return;
  }

  try {
    const credential = EmailAuthProvider.credential(userData.email, password);

    const { user: linkedUser } = await linkWithCredential(
      auth.currentUser!,
      credential,
    );

    await updateProfile(linkedUser, {
      displayName: username,
    });

    const userRef = ref(dbRealtime, `users/${linkedUser.uid}`);
    await update(userRef, {
      displayName: username,
      email: linkedUser.email,
    });

    localStorage.removeItem("googleUserData");

    toast.success("Account linked successfully with email and password.");
  } catch (error) {
    if (error instanceof FirebaseError) {
      let message = "";

      switch (error.code) {
        case "auth/email-already-in-use":
          message = "This email is already in use with another account.";
          break;
        case "auth/invalid-credential":
          message = "The provided credential is invalid.";
          break;
        case "auth/user-mismatch":
          message = "The provided credentials do not match the current user.";
          break;
        case "auth/weak-password":
          message = "The password is too weak.";
          break;
        default:
          message = error.message;
      }

      toast.error(message);
    } else {
      console.error("Unexpected error:", error);
      toast.error("Something went wrong. Please try again later.");
    }
  }
};
