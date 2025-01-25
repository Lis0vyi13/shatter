import { RefObject } from "react";
import { LoadingBarRef } from "react-top-loading-bar";

import { createPasswordAction } from "../CreatePassword.action";

const useCreatePassword = (loadingBarRef: RefObject<LoadingBarRef>) => {
  const handleSubmit = async (formData: FormData) => {
    loadingBarRef.current?.continuousStart();

    try {
      const startTime = Date.now();

      await createPasswordAction(formData);

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
