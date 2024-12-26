"use client";

import { signInWithProvider } from "@/services/auth";
import { AuthProvider } from "firebase/auth";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "sonner";

interface SocialAuthProps {
  router: AppRouterInstance;
  provider: AuthProvider;
}

export const handleSocialAuth = async ({
  provider,
  router,
}: SocialAuthProps) => {
  try {
    const user = await signInWithProvider(provider);

    const isPasswordProvider = user?.providerData.some(
      (data) => data.providerId === "password"
    );

    if (user && !isPasswordProvider) {
      localStorage.setItem("googleUserData", JSON.stringify(user));
      router.push("/create-password");
    }
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("An unexpected error occurred during sign-in.");
    }
  }
};
