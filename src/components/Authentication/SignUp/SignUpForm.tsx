import { useRef } from "react";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import AuthLoader from "../AuthLoader";

import { FaArrowRightLong } from "react-icons/fa6";
import useSignUpForm from "./useSignUpForm";
import Link from "next/link";
import { changeUrlWithoutReload } from "@/utils";

const SignUpForm = () => {
  const {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    isSubmitted,
    progressValue,
    handleSubmit,
  } = useSignUpForm();
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const inputClassName =
    "bg-dark pl-3 py-3 text-white text-[12px] placeholder:text-[12px] placeholder:text-white placeholder:text-opacity-30 outline outline-gray/45 focus:outline-white/55";

  return (
    <form
      onSubmit={handleSubmit}
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
        value={username}
        setValue={setUsername}
        className={`${inputClassName} ${username ? "outline-white/55" : ""}`}
        autoComplete="name"
      />
      <Input
        name="email"
        type="email"
        placeholder="Email"
        required
        isDark
        value={email}
        setValue={setEmail}
        className={`${inputClassName} ${email ? "outline-white/55" : ""}`}
        autoComplete="email"
      />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        required
        minLength={6}
        value={password}
        setValue={setPassword}
        className={`${inputClassName} ${password ? "outline-white/55" : ""}`}
        autoComplete="new-password"
      />
      <Button
        ref={submitButtonRef}
        className="text-dark flex justify-center hover:bg-gray text-[12px] py-3 items-center gap-1 mt-6 bg-white rounded-2xl"
      >
        <span>Sign Up</span> <FaArrowRightLong className="mt-[2px]" />
      </Button>

      <div className="flex gap-1 items-center justify-center text-[12px]">
        <span>Already have an account?</span>
        <div>
          <Button
            type="button"
            onClick={() => changeUrlWithoutReload("/auth/login")}
            className="border inline-block text-[12px] bg-dark hover:bg-[#464646] w-fit px-[10px] py-[2px] rounded-2xl border-gray"
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
