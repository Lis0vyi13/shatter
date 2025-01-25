import { linkGoogleWithPassword } from "@/services/auth/accountLinking";

export async function createPasswordAction(formData: FormData) {
  const username = formData.get("username") as string | null;
  const password = formData.get("password") as string | null;

  if (username && password) {
    await linkGoogleWithPassword({ username, password });
  } else {
    throw new Error("Username and password are required.");
  }

  return { username, password };
}
