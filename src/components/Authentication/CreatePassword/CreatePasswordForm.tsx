"use client";

import { startTransition, useActionState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPasswordAction } from "./CreatePassword.action";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import CircleLoader from "@/components/ui/CircleLoader";

import { FaArrowRightLong } from "react-icons/fa6";

import { authInputClassName } from "@/constants";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";

const CreatePasswordForm = () => {
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const [, action, isPending] = useActionState(createPasswordAction, {
    username: "",
    password: "",
  });
  const { replace } = useRouter();
  const loadingBarRef = useRef<LoadingBarRef>(null);

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
        action={(e) => {
          handleSubmit(e);
          replace("/c");
        }}
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
          name="username"
          placeholder="Username"
          required
          isDark
          className={authInputClassName}
          autoComplete="name"
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          minLength={6}
          required
          className={authInputClassName}
          autoComplete="new-password"
        />
        <Button
          ref={submitButtonRef}
          className="text-dark flex justify-center hover:bg-gray text-[14px] py-3 items-center gap-1 mt-6 bg-white rounded-2xl"
        >
          {isPending ? (
            <CircleLoader />
          ) : (
            <>
              <span>Log In</span> <FaArrowRightLong className="mt-[1px]" />
            </>
          )}
        </Button>
      </form>
    </>
  );
};

export default CreatePasswordForm;
