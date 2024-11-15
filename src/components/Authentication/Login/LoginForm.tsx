"use client";

import { useRef } from "react";

import { changeUrlWithoutReload } from "@/utils";
import useLoginForm from "./useLoginForm";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

import { FaArrowRightLong } from "react-icons/fa6";

const LoginForm = () => {
  const { email, setEmail, password, setPassword, handleSubmit } =
    useLoginForm();
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
      className="mt-4 w-full xs:w-[270px] px-4 xs:px-0 flex flex-col gap-3 max-w-full"
    >
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
        minLength={6}
        required
        value={password}
        setValue={setPassword}
        className={`${inputClassName} ${password ? "outline-white/55" : ""}`}
        autoComplete="new-password"
      />
      <Button
        ref={submitButtonRef}
        className="text-dark flex justify-center hover:bg-gray text-[12px] py-3 items-center gap-1 mt-6 bg-white rounded-2xl"
      >
        <span>Log In</span> <FaArrowRightLong className="mt-[2px]" />
      </Button>

      <div className="flex gap-1 items-center justify-center text-[12px]">
        <span>Don't have an account?</span>
        <div>
          <Button
            type="button"
            onClick={() => changeUrlWithoutReload("/auth/sign-up")}
            className="border inline-block text-[12px] bg-dark hover:bg-[#464646] w-fit px-[10px] py-[2px] rounded-2xl border-gray"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
