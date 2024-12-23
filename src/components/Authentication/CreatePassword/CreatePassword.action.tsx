import { signUpWithGoogleAndEmail } from "@/firebase/google/signUpWithGoogleAndEmail";

export async function createPasswordAction(_: unknown, formData: FormData) {
  const username = formData.get("username") as string | null;
  const password = formData.get("password") as string | null;

  if (username && password)
    await signUpWithGoogleAndEmail({ username, password });

  return {
    username,
    password,
  };
}
