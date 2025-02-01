import { useRef, useState } from "react";

import { forgotPasswordAction } from "./ForgotPassword.action";
import { handleEnterKey } from "@/utils";

import Button from "@/components/ui/Buttons/Button";
import CircleLoader from "@/components/ui/CircleLoader";
import AuthInput from "@/components/ui/Inputs/AuthInput";

import { FaArrowRightLong } from "react-icons/fa6";
import { authInputClassName } from "../Auth.constants";

const ForgotPasswordForm = () => {
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const [isPending, setIsPending] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setIsPending(true);

    await forgotPasswordAction(formData);

    setIsPending(false);
  };
  return (
    <form
      onSubmit={onSubmit}
      onKeyDown={(e) => handleEnterKey(e, submitButtonRef)}
      className="mt-2 w-full px-4 xs:px-0 xs:w-[270px] flex flex-col gap-3 max-w-full"
    >
      <AuthInput
        name="email"
        placeholder="Email"
        required
        isDark
        className={authInputClassName}
        autoComplete="email"
      />

      <Button
        ref={submitButtonRef}
        className="text-dark flex justify-center hover:bg-gray text-[14px] py-3 items-center gap-1 mt-3 bg-white rounded-2xl"
      >
        {isPending ? (
          <CircleLoader />
        ) : (
          <>
            <span>Reset</span> <FaArrowRightLong />
          </>
        )}
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
