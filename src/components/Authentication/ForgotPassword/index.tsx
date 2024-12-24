"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import useAuth from "@/hooks/useAuth";

import AuthWrapper from "../AuthWrapper";
import AuthHeader from "../AuthHeader";
import ForgotPasswordForm from "./ForgotPasswordForm";

import { authDefaultVariants } from "@/constants/animations";

const ForgotPassword = () => {
  const isAuth = useAuth();
  const { replace } = useRouter();

  useEffect(() => {
    if (isAuth && !localStorage.getItem("googleUserData")) {
      replace("/c");
    }
  }, [isAuth, replace]);

  return (
    <AuthWrapper>
      <AuthHeader
        title="Forgot Password"
        description="Enter your email account to reset password"
      />

      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8, delay: 0.5 }}
        className="w-full mb-4 flex flex-col justify-center items-center"
        variants={authDefaultVariants}
      >
        <ForgotPasswordForm />
      </motion.div>
    </AuthWrapper>
  );
};

export default ForgotPassword;
