import { Fragment, useRef, useState } from "react";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";
import { Link } from "react-router-dom";

import { handleEnterKey } from "@/utils";
import useLogin from "./hooks/useLogin";

import CircleLoader from "@/components/ui/CircleLoader";
import Button from "@/components/ui/Button";
import AuthInput from "@/components/ui/Inputs/AuthInput";

import { FaArrowRightLong } from "react-icons/fa6";
import { authInputClassName, LOGIN_PASSWORD_INPUTS } from "../Auth.constants";

const LoginForm = () => {
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const loadingBarRef = useRef<LoadingBarRef>(null);
  const [isPending, setIsPending] = useState(false);
  console.log(isPending);
  const { handleSubmit, isTransitionPending } = useLogin(loadingBarRef);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setIsPending(true);
    await handleSubmit(formData);
    setIsPending(false);
  };

  return (
    <>
      <LoadingBar
        color="#7678ed"
        height={2}
        shadow={true}
        ref={loadingBarRef}
        className="transition-all duration-500"
      />
      <form
        onSubmit={onSubmit}
        onKeyDown={(e) => handleEnterKey(e, submitButtonRef)}
        className="mt-4 w-full xs:w-[270px] px-4 xs:px-0 flex flex-col gap-3 max-w-full"
      >
        {LOGIN_PASSWORD_INPUTS.map((input) => (
          <Fragment key={input.name}>
            <AuthInput className={authInputClassName} {...input} />
          </Fragment>
        ))}
        <Link
          to={"/forgot-password"}
          className="text-[12px] text-gray hover:underline cursor-pointer text-right"
        >
          Forgot Password?
        </Link>
        <Button
          ref={submitButtonRef}
          disabled={isPending || isTransitionPending}
          className="text-dark flex justify-center hover:bg-gray text-[14px] py-3 items-center gap-1 mt-3 bg-white rounded-2xl transition-all duration-300"
        >
          <span>
            {isPending || isTransitionPending ? <CircleLoader /> : "Log In"}
          </span>
          {!isPending && !isTransitionPending && (
            <FaArrowRightLong className="mt-[2px]" />
          )}
        </Button>

        <div className="flex gap-3 items-center justify-center text-[13px]">
          <span>Don&apos;t have an account?</span>
          <div>
            <Link to={"/sign-up"}>
              <Button
                type="button"
                className="border inline-block text-[13px] bg-dark hover:bg-[#464646] w-fit px-[10px] py-[2px] rounded-2xl border-gray transition-colors duration-300"
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
