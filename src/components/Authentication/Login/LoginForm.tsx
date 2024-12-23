"use client";

import { useActionState, useRef } from "react";
import Link from "next/link";

import { changeUrlWithoutReload } from "@/utils";

import Input from "@/components/ui/Input";
import CircleLoader from "@/components/ui/CircleLoader";
import Button from "@/components/ui/Button";

import { FaArrowRightLong } from "react-icons/fa6";
import { loginAction } from "./Login.action";

const LoginForm = () => {
  const [, action, isPending] = useActionState(loginAction, {
    email: "",
    password: "",
  });

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
      className="mt-4 w-full xs:w-[270px] px-4 xs:px-0 flex flex-col gap-3 max-w-full"
    >
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
        minLength={6}
        required
        className={inputClassName}
        autoComplete="current-password"
      />
      <Link
        href={"/forgot-password"}
        className="text-[12px] text-gray hover:underline cursor-pointer text-right"
      >
        Forgot Password?
      </Link>
      <Button
        ref={submitButtonRef}
        disabled={isPending}
        className="text-dark flex justify-center hover:bg-gray text-[14px] py-3 items-center gap-1 mt-3 bg-white rounded-2xl"
      >
        <span>{isPending ? <CircleLoader /> : "Log In"}</span>
        {!isPending && <FaArrowRightLong className="mt-[2px]" />}
      </Button>

      <div className="flex gap-3 items-center justify-center text-[13px]">
        <span>Don&apos;t have an account?</span>
        <div>
          <Button
            type="button"
            onClick={() => changeUrlWithoutReload("/sign-up")}
            className="border inline-block text-[13px] bg-dark hover:bg-[#464646] w-fit px-[10px] py-[2px] rounded-2xl border-gray"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
