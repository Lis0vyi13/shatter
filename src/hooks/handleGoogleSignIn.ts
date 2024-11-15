"use client";

import { socialSignIn } from "@/firebase/google/socialSignIn";

import { GoogleAuthProvider } from "firebase/auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface IHandleGoogleSignIn {
  router: AppRouterInstance;
}
export const handleGoogleSignIn = async ({ router }: IHandleGoogleSignIn) => {
  const googleProvider = new GoogleAuthProvider();

  await socialSignIn({ router, provider: googleProvider });
};
