import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { actionCodeSettings, auth } from "./firebaseConfig";
import { toast } from "sonner";

const doCreateUserWithEmailAndPassword = async (
  email: string,
  password: string,
  displayName: string,
  setProgressValue: React.Dispatch<React.SetStateAction<number>>
) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 0));

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await updateProfile(user, { displayName });

    const progressSteps = [33, 66, 90, 100];
    for (const progress of progressSteps) {
      await new Promise((resolve) => {
        setTimeout(() => {
          setProgressValue(progress);
          resolve(null);
        }, 600);
      });
    }

    await sendEmailVerification(user, actionCodeSettings);
    toast.info("Verification email sent. Please check your inbox.");
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("An unexpected error occurred. Please try again.");
    }

    throw error;
  }
};

export default doCreateUserWithEmailAndPassword;
