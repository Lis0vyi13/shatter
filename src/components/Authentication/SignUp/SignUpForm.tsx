import { useActionState, useRef, useState } from "react";

import { changeUrlWithoutReload } from "@/utils";
import { signUpAction } from "./SignUp.action";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import AuthLoader from "../AuthLoader";

import { FaArrowRightLong } from "react-icons/fa6";

const initialState = {
  username: "",
  email: "",
  password: "",
};

const SignUpForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  console.log(isSubmitted);
  const [, action] = useActionState(
    (prevState: unknown, formData: FormData) => {
      return signUpAction(
        prevState,
        formData,
        setProgressValue,
        setIsSubmitted
      );
    },
    initialState
  );
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
      className="mt-4 w-full xs:w-[270px] flex flex-col gap-3 px-4 xs:px-0 max-w-full"
    >
      <Input
        name="username"
        placeholder="Username"
        required
        isDark
        className={inputClassName}
        autoComplete="name"
      />
      <Input
        name="email"
        type="email"
        placeholder="Email"
        required
        isDark
        className={inputClassName}
        autoComplete="email"
      />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        required
        minLength={6}
        className={inputClassName}
        autoComplete="new-password"
      />
      <Button
        ref={submitButtonRef}
        className="text-dark flex justify-center hover:bg-gray text-[14px] py-3 items-center gap-1 mt-6 bg-white rounded-2xl"
      >
        <span>Sign Up</span> <FaArrowRightLong className="mt-[2px]" />
      </Button>

      <div className="flex gap-3 items-center justify-center text-[13px]">
        <span>Already have an account?</span>
        <div>
          <Button
            type="button"
            onClick={() => changeUrlWithoutReload("/login")}
            className="border inline-block text-[13px] bg-dark hover:bg-[#464646] w-fit px-[10px] py-[2px] rounded-2xl border-gray"
          >
            Log In
          </Button>
        </div>
      </div>
      {isSubmitted && <AuthLoader value={progressValue} />}
    </form>
  );
};

export default SignUpForm;
