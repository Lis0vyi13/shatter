import { RefObject } from "react";
import { LoadingBarRef } from "react-top-loading-bar";
import { toast } from "sonner";

import { createPasswordAction } from "../CreatePassword.action";
import { confirmPasswordReset } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";

const useCreatePassword = (
  loadingBarRef: RefObject<LoadingBarRef>,
  oob: string | null,
) => {
  const handleSubmit = async (formData: FormData) => {
    loadingBarRef.current?.continuousStart();

    try {
      const startTime = Date.now();
      const password = formData.get("password") as string;
      if (oob) {
        try {
          await confirmPasswordReset(auth, oob, password);
          toast.success("Password changed successfully! You can now log in.");
        } catch (error) {
          console.log(error);
          toast.error("Failed to reset password. Try again.");
        }
      } else {
        await createPasswordAction(formData);
      }

      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < 800) {
        await new Promise((resolve) => setTimeout(resolve, 800 - elapsedTime));
      }
    } catch (error) {
      console.error("Error during password creation:", error);
    } finally {
      setTimeout(() => {
        loadingBarRef.current?.complete();
      }, 300);
    }
  };

  return { handleSubmit };
};

export default useCreatePassword;
