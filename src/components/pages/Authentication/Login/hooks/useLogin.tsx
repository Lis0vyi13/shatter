import { RefObject, useTransition } from "react";
import { LoadingBarRef } from "react-top-loading-bar";

import { loginAction } from "../Login.action";

const useLogin = (ref: RefObject<LoadingBarRef>) => {
  const [isTransitionPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    ref.current?.continuousStart();

    const startTime = Date.now();
    startTransition(() => {
      loginAction(formData)
        .then(() => {
          const elapsedTime = Date.now() - startTime;
          const delay = Math.max(0, 800 - elapsedTime);
          return new Promise((resolve) => setTimeout(resolve, delay));
        })
        .catch((error: Error) => {
          throw error;
        })
        .finally(() => {
          ref.current?.complete();
        });
    });
  };

  return { handleSubmit, isTransitionPending };
};

export default useLogin;
