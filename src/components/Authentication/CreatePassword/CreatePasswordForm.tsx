"use client";
import { useRef } from "react";

import useCreatePasswordForm from "./useCreatePasswordForm";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { FaArrowRightLong } from "react-icons/fa6";
import CircleLoader from "@/components/ui/CircleLoader";

const CreatePasswordForm = () => {
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const {
    username,
    setUsername,
    password,
    setPassword,
    handleSubmit,
    isLoading,
  } = useCreatePasswordForm();
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
      className="mt-4 w-full px-4 xs:px-0 xs:w-[270px] flex flex-col gap-3 max-w-full"
    >
      <Input
        name="username"
        placeholder="Username"
        required
        value={username}
        isDark
        setValue={setUsername}
        className={`${inputClassName} ${username ? "outline-white/55" : ""}`}
        autoComplete="name"
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
        {isLoading ? (
          <CircleLoader />
        ) : (
          <>
            <span>Log In</span> <FaArrowRightLong className="mt-[2px]" />
          </>
        )}
      </Button>
    </form>
  );
};

export default CreatePasswordForm;
