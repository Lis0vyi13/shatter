import {
  linkWithCredential,
  EmailAuthProvider,
  updateProfile,
  User,
  sendEmailVerification,
} from "firebase/auth";
import { actionCodeSettings, auth } from "../firebaseConfig";
import { toast } from "sonner";

interface ICreatePasswordForm {
  username: string;
  password: string;
}

export const signUpWithGoogleAndEmail = async (data: ICreatePasswordForm) => {
  const storedUserData = localStorage.getItem("googleUserData");
  const userData = storedUserData ? JSON.parse(storedUserData) : null;

  if (userData && userData.email) {
    try {
      const credential = EmailAuthProvider.credential(userData.email, data.password);
      const userCredential = await linkWithCredential(auth.currentUser as User, credential);
      const linkedUser = userCredential.user;

      await updateProfile(linkedUser, { displayName: data.username });

      if (!linkedUser.emailVerified) {
        await sendEmailVerification(linkedUser, actionCodeSettings);
        toast.info("Verification email sent. Please check your inbox.");
      }
      localStorage.removeItem("googleUserData");
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "auth/email-already-in-use") {
          toast.error("This email is already in use with another account.");
        } else {
          toast.error(error.message);
          console.error(error);
        }
      }
    }
  } else {
    toast.error("Please sign up using Google first.");
  }
};
