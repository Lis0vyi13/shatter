import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Logo from "../../common/Logo";

import { authDefaultVariants } from "@/constants/animations";

interface IAuthHeader {
  slogan?: string;
  title: string;
  description: string;
}
const AuthHeader = ({
  slogan = "Break the Silence, Spark the Conversation",
  title,
  description,
}: IAuthHeader) => {
  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8, delay: 0.1 }}
        variants={authDefaultVariants}
        className="pt-5"
      >
        <Link to={"/"} className="logo pt-4">
          <Logo width={36} height={36} />
        </Link>
      </motion.div>
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8, delay: 0.2 }}
        variants={authDefaultVariants}
        className="w-full"
      >
        <div className="signup-header flex flex-col justify-center items-center mt-14">
          <p className="slogan inline-block text-[12px] xs:text-[14px] text-gray px-4 py-2 bg-white bg-opacity-5 rounded-full">
            {slogan}
          </p>
          <div className="py-4">
            <h1 className="mt-3 pb-1 text-[28px] font-[500] leading-8">
              {title}
            </h1>
            <span className="text-gray inline-block pt-2 text-[12px]">
              {description}
            </span>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AuthHeader;
