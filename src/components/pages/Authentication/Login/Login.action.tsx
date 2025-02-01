import { AuthErrorCodes } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { toast } from "sonner";

import { signInWithEmail } from "@/services/auth";
import { shouldRedirect } from "@/utils";

export async function loginAction(formData: FormData) {
  const data = {
    email: formData.get("email") as string | null,
    password: formData.get("password") as string | null,
  };
  if (data.email && data.password) {
    try {
      await signInWithEmail(data.email, data.password);
      if (shouldRedirect()) {
        toast.success("You have successfully logged in!");
      } else {
        toast.error("You need to verify your email. Check your inbox!");
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === AuthErrorCodes.INVALID_EMAIL) {
          toast.error("The email address is not valid.");
        } else if (error.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
          toast.error(
            "Invalid email or password. Please check your details and try again.",
          );
        } else {
          toast.error(
            `An unexpected Firebase error occurred: ${error.message}`,
          );
        }
      } else {
        toast.error("An unexpected error occurred during sign-in.");
      }
    }
  }
  return data;
}
