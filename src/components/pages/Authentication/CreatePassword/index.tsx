import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";

import useAuth from "@/hooks/useAuth";

import AuthWrapper from "../AuthWrapper";
import AuthHeader from "../AuthHeader";
import CreatePasswordForm from "./CreatePasswordForm";

import { authDefaultVariants } from "@/constants/animations";

const CreatePassword = () => {
  const isAuth = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const oob = searchParams.get("oobCode");

  useEffect(() => {
    if (!localStorage.getItem("googleUserData") && !oob) {
      navigate(isAuth ? "/c" : "/login", { replace: true });
    }
  }, [isAuth, navigate, oob]);

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
        <CreatePasswordForm oob={oob} />
      </motion.div>
    </AuthWrapper>
  );
};

export default CreatePassword;
