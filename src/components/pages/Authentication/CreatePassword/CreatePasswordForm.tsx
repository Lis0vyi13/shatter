import { Fragment, startTransition, useRef, useState } from "react";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";
import { useNavigate } from "react-router-dom";

import { handleEnterKey } from "@/utils";
import useCreatePassword from "./hooks/useCreatePassword";

import Button from "@/components/ui/Buttons/Button";
import CircleLoader from "@/components/ui/CircleLoader";
import AuthInput from "@/components/ui/Inputs/AuthInput";

import { FaArrowRightLong } from "react-icons/fa6";

import { authInputClassName, CREATE_PASSWORD_INPUTS } from "../Auth.constants";

const CreatePasswordForm = () => {
  const navigate = useNavigate();
  const loadingBarRef = useRef<LoadingBarRef>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const { handleSubmit } = useCreatePassword(loadingBarRef);
  const [isPending, setIsPending] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setIsPending(true);

    startTransition(() => {
      handleSubmit(formData)
        .then(() => {
          navigate("/c", { replace: true });
        })
        .finally(() => {
          setIsPending(false);
        });
    });
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
        className="mt-4 w-full px-4 xs:px-0 xs:w-[270px] flex flex-col gap-3 max-w-full"
      >
        {CREATE_PASSWORD_INPUTS.map((input) => (
          <Fragment key={input.name}>
            <AuthInput className={authInputClassName} {...input} />
          </Fragment>
        ))}
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
