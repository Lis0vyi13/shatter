import { signInWithEmailAndPassword, User } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { toast } from "sonner";

export const doSignInWithEmailAndPassword = async (
  email: string,
  password: string,
): Promise<User | null> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("An unexpected error occurred.");
    }
    return null;
  }
};
