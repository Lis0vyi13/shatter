import { AuthProvider, signInWithPopup, User } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { toast } from "sonner";

export const doSignInWithPopup = async (provider: AuthProvider): Promise<User | null> => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    return user;
  } catch (error) {
    if (error instanceof Error) {
      const errorMessage = error.message;
      toast.error(errorMessage);
    } else {
      console.log(error);
    }
    return null;
  }
};
