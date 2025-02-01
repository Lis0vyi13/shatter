import { Fragment, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { handleEnterKey } from "@/utils";
import { signUpAction } from "./SignUp.action";

import Button from "@/components/ui/Buttons/Button";
import AuthInput from "@/components/ui/Inputs/AuthInput";
import AuthLoader from "../AuthLoader";

import { FaArrowRightLong } from "react-icons/fa6";
import { authInputClassName, SIGNUP_PASSWORD_INPUTS } from "../Auth.constants";

const SignUpForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await signUpAction(formData, setProgressValue, setIsSubmitted);
  };

  return (
    <form
      onSubmit={onSubmit}
      onKeyDown={(e) => handleEnterKey(e, submitButtonRef)}
      className="mt-4 w-full xs:w-[270px] flex flex-col gap-3 px-4 xs:px-0 max-w-full"
    >
      {SIGNUP_PASSWORD_INPUTS.map((input) => (
        <Fragment key={input.name}>
          <AuthInput className={authInputClassName} {...input} />
        </Fragment>
      ))}
      <Button
        ref={submitButtonRef}
        className="text-dark flex justify-center hover:bg-gray text-[14px] py-3 items-center gap-1 mt-6 bg-white rounded-2xl"
      >
        <span>Sign Up</span> <FaArrowRightLong className="mt-[2px]" />
      </Button>

      <div className="flex gap-3 items-center justify-center text-[13px]">
        <span>Already have an account?</span>
        <div>
          <Link to={"/login"}>
            <Button
              type="button"
              className="border inline-block text-[13px] bg-dark hover:bg-[#464646] w-fit px-[10px] py-[2px] rounded-2xl border-gray"
            >
              Log In
            </Button>
          </Link>
        </div>
      </div>
      {isSubmitted && <AuthLoader value={progressValue} />}
    </form>
  );
};

export default SignUpForm;
