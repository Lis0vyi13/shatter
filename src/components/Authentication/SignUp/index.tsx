"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { handleGoogleSignIn } from "@/hooks/handleGoogleSignIn";
import { cn } from "@/utils";

import AuthWrapper from "../AuthWrapper";
import AuthHeader from "../AuthHeader";
import SignUpForm from "./SignUpForm";
import Button from "@/components/ui/Button";

import { AUTH_SERVICES } from "@/constants";
import { authDefaultVariants } from "@/constants/animations";

const SignUp = ({ pathname }: { pathname: string | null }) => {
  const isLoginPage = pathname === "login";
  const router = useRouter();

  return (
    <AuthWrapper className={isLoginPage ? "translate-x-full" : ""}>
      <AuthHeader
        title="Sign up account"
        description="Enter your personal data to create your account"
      />

      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8, delay: 0.3 }}
        variants={authDefaultVariants}
      >
        <div className="auth-buttons mt-2 flex gap-3 items-center">
          {AUTH_SERVICES.map(({ title, Icon }) => (
            <Button
              onClick={async () => {
                await handleGoogleSignIn({ router });
              }}
              key={title}
              className={cn(
                "rounded-lg w-[80px] text-[18px] flex items-center justify-center border border-gray hover:bg-[#4287f5]"
              )}
            >
              {Icon}
            </Button>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8, delay: 0.4 }}
        variants={authDefaultVariants}
        className="w-full flex flex-col justify-center items-center"
      >
        <div className="divider-block w-full px-4 xs:px-0 xs:w-[280px] flex justify-center items-center gap-2 text-gray mt-4 text-[9px]">
          <div className="divider w-full h-[2px] bg-gray bg-opacity-15" />
          <span>OR</span>
          <div className="divider w-full h-[2px] bg-gray bg-opacity-15" />
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8, delay: 0.5 }}
        variants={authDefaultVariants}
        className="w-full mb-4 flex flex-col justify-center items-center"
      >
        <SignUpForm />
      </motion.div>
    </AuthWrapper>
  );
};

export default SignUp;
