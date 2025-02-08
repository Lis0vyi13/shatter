import { ReactNode } from "react";
import { motion } from "framer-motion";

import { authFormVariants } from "@/constants/animations";

const AuthFormWrapper = ({ children }: { children: ReactNode }) => (
  <motion.div
    className="flex relative h-full w-[100%] mdLg:w-[unset] min-w-[30%] overflow-hidden"
    initial="hidden"
    animate="visible"
    transition={{ duration: 0.9 }}
    variants={authFormVariants}
  >
    {children}
  </motion.div>
);

export default AuthFormWrapper;
