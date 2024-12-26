"use client";

import { handleSocialAuth } from "@/utils/socialAuth";

import { GoogleAuthProvider } from "firebase/auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface IHandleGoogleSignIn {
  router: AppRouterInstance;
}
export const handleGoogleSignIn = async ({ router }: IHandleGoogleSignIn) => {
  const googleProvider = new GoogleAuthProvider();

  await handleSocialAuth({ router, provider: googleProvider });
};
