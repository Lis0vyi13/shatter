import { auth, dbRealtime } from "@/firebase/firebaseConfig";
import {
  linkWithCredential,
  EmailAuthProvider,
  updateProfile,
  User,
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
  } catch (error: any) {
    const message =
      error.code === "auth/email-already-in-use"
        ? "This email is already in use with another account."
        : error.message;

    toast.error(message);
  }
};
