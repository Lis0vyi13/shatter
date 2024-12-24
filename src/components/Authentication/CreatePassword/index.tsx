"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import useAuth from "@/hooks/useAuth";

import AuthWrapper from "../AuthWrapper";
import AuthHeader from "../AuthHeader";
import CreatePasswordForm from "./CreatePasswordForm";

import { authDefaultVariants } from "@/constants/animations";

const CreatePassword = () => {
  const isAuth = useAuth();
  const { replace } = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("googleUserData")) {
      if (isAuth) {
        replace("/c");
      } else {
        replace("/login");
      }
    }
  }, [isAuth, replace]);

  return (
    <AuthWrapper>
      <AuthHeader
        title="Create Password"
        description="Create a new password to sign in"
      />

      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8, delay: 0.5 }}
        className="w-full mb-4 flex flex-col justify-center items-center"
        variants={authDefaultVariants}
      >
        <CreatePasswordForm />
      </motion.div>
    </AuthWrapper>
  );
};

export default CreatePassword;
