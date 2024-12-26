import { resetPassword } from "@/services/auth";

export async function forgotPasswordAction(_: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  try {
    await resetPassword(email);
  } catch (error) {
    console.log(error);
  }
  return email;
}
