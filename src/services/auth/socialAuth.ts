import { NavigateFunction } from "react-router-dom";

import { signInWithProvider } from "@/services/auth";
import { GoogleAuthProvider } from "firebase/auth";

import { toast } from "sonner";

interface SocialAuthProps {
  navigate: NavigateFunction;
}

export const handleSocialAuth = async ({ navigate }: SocialAuthProps) => {
  try {
    const googleProvider = new GoogleAuthProvider();

    const user = await signInWithProvider(googleProvider);

    const isPasswordProvider = user?.providerData.some(
      (data) => data.providerId === "password"
    );

    if (user && !isPasswordProvider) {
      localStorage.setItem("googleUserData", JSON.stringify(user));
      navigate("/create-password");
    }
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("An unexpected error occurred during sign-in.");
    }
  }
};
