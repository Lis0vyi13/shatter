import { useActionState, useRef } from "react";

import { forgotPasswordAction } from "./ForgotPassword.action";

import Button from "@/components/ui/Button";
import CircleLoader from "@/components/ui/CircleLoader";
import Input from "@/components/ui/Input";

import { FaArrowRightLong } from "react-icons/fa6";

const ForgotPasswordForm = () => {
  const [, action, isPending] = useActionState(forgotPasswordAction, "");
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const inputClassName =
    "bg-dark pl-3 py-3 text-white text-[14px] placeholder:text-[14px] placeholder:text-white placeholder:text-opacity-30 outline outline-gray/45 focus:outline-white/55";

  return (
    <form
      action={action}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          if (submitButtonRef.current) {
            submitButtonRef.current.focus();
          }
        }
      }}
      className="mt-4 w-full px-4 xs:px-0 xs:w-[270px] flex flex-col gap-3 max-w-full"
    >
      <Input
        name="email"
        placeholder="Email"
        required
        isDark
        className={inputClassName}
        autoComplete="email"
      />

      <Button
        ref={submitButtonRef}
        className="text-dark flex justify-center hover:bg-gray text-[14px] py-3 items-center gap-1 mt-6 bg-white rounded-2xl"
      >
        {isPending ? (
          <CircleLoader />
        ) : (
          <>
            <span>Reset</span> <FaArrowRightLong className="-mt-[1px]" />
          </>
        )}
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
