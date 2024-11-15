"use client";

import { AuthProvider } from "firebase/auth";
import { toast } from "sonner";

import { doSignInWithPopup } from "./doSignInWithPopup";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface ISocialSignInProps {
  router: AppRouterInstance;
  provider: AuthProvider;
}

export const socialSignIn = async (props: ISocialSignInProps) => {
  const { provider, router } = props;

  try {
    const user = await doSignInWithPopup(provider);

    const hasPasswordProvider = user?.providerData.some(
      (data) => data.providerId === "password"
    );

    console.log(user, hasPasswordProvider);
    if (user && !hasPasswordProvider) {
      localStorage.setItem("googleUserData", JSON.stringify(user));
      router.push("/auth/create-password");
    }
  } catch (error) {
    toast.error("An error occurred during sign-in. Please try again.");
  }
};
