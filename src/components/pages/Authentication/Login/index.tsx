import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { handleSocialAuth } from "@/services/auth/socialAuth";

import AuthWrapper from "../AuthWrapper";
import AuthHeader from "../AuthHeader";
import Button from "@/components/ui/Button";
import LoginForm from "./LoginForm";

import { authDefaultVariants } from "@/constants/animations";
import { AUTH_SERVICES } from "../Auth.constants";

const Login = ({ pathname }: { pathname: string | null }) => {
  const isLoginPage = pathname === "login";
  const navigate = useNavigate();

  return (
    <AuthWrapper className={isLoginPage ? "-ml-[100%]" : ""}>
      <AuthHeader
        title="Log in"
        description="Enter your credentials to access your account"
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
                await handleSocialAuth({ navigate });
              }}
              key={title}
              className={
                "rounded-lg w-[80px] text-[18px] flex items-center justify-center border border-gray hover:bg-[#4287f5]"
              }
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
        <LoginForm />
      </motion.div>
    </AuthWrapper>
  );
};

export default Login;
