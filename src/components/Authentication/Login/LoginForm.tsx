"use client";

import { useActionState, useRef, useTransition } from "react";
import Link from "next/link";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";

import { changeUrlWithoutReload } from "@/utils";
import { loginAction } from "./Login.action";

import Input from "@/components/ui/Inputs/Input";
import CircleLoader from "@/components/ui/CircleLoader";
import Button from "@/components/ui/Button";

import { FaArrowRightLong } from "react-icons/fa6";

const LoginForm = () => {
  const [, action, isPending] = useActionState(loginAction, {
    email: "",
    password: "",
  });
  const [isPending2, startTransition] = useTransition();

  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const loadingBarRef = useRef<LoadingBarRef>(null);

  const inputClassName =
    "bg-dark pl-3 py-3 text-white text-[14px] placeholder:text-[14px] placeholder:text-white placeholder:text-opacity-30 outline outline-gray/45 focus:outline-white/55";

  const handleSubmit = async (formData: FormData) => {
    loadingBarRef.current?.continuousStart();

    try {
      startTransition(async () => {
        const startTime = Date.now();

        try {
          await action(formData);
        } catch (error) {
          console.error(error);
          throw error;
        } finally {
          const elapsedTime = Date.now() - startTime;
          if (elapsedTime < 800) {
            await new Promise((resolve) =>
              setTimeout(resolve, 800 - elapsedTime)
            );
          }
        }
      });
    } finally {
      setTimeout(() => {
        loadingBarRef.current?.complete();
      }, 300);
    }
  };

  return (
    <>
      <LoadingBar
        color="#7678ed"
        height={3}
        shadow={true}
        ref={loadingBarRef}
        className="transition-all duration-500"
      />
      <form
        action={handleSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter" && submitButtonRef.current) {
            submitButtonRef.current.focus();
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
          disabled={isPending || isPending2}
          className="text-dark flex justify-center hover:bg-gray text-[14px] py-3 items-center gap-1 mt-3 bg-white rounded-2xl transition-all duration-300"
        >
          <span>{isPending || isPending2 ? <CircleLoader /> : "Log In"}</span>
          {!isPending && !isPending2 && (
            <FaArrowRightLong className="mt-[2px]" />
          )}
        </Button>

        <div className="flex gap-3 items-center justify-center text-[13px]">
          <span>Don&apos;t have an account?</span>
          <div>
            <Button
              type="button"
              onClick={() => changeUrlWithoutReload("/sign-up")}
              className="border inline-block text-[13px] bg-dark hover:bg-[#464646] w-fit px-[10px] py-[2px] rounded-2xl border-gray transition-colors duration-300"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
