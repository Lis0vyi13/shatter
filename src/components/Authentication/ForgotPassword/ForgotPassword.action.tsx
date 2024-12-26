

export async function forgotPasswordAction(_: unknown, formData: FormData) {
  return formData.get("email") as string | null;
}
