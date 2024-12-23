import { doSignInWithEmailAndPassword } from "@/firebase/signIn";
import { toast } from "sonner";

export async function loginAction(_: unknown, formData: FormData) {
  const data = {
    email: formData.get("email") as string | null,
    password: formData.get("password") as string | null,
  };
  if (data.email && data.password) {
    try {
      const user = await doSignInWithEmailAndPassword(
        data.email,
        data.password
      );
      if (user) {
        toast.success("You have successfully logged in!");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred during sign-in.");
      }
    }
  }
  return data;
}
