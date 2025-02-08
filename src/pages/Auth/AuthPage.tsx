import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

import Login from "@/components/pages/Authentication/Login";
import SignUp from "@/components/pages/Authentication/SignUp";
import AuthVideoBlock from "@/components/pages/Authentication/AuthVideoBlock";
import CustomLoadingBar from "@/components/ui/CustomLoadingBar";

import { authFormVariants } from "@/constants/animations";

export default function AuthPage() {
  const pathname = window.location.pathname;
  const currentPageName = pathname.split("/").at(-1);

  return (
    <>
      <Helmet>
        <title>
          {currentPageName === "login" ? "Login" : "Sign Up"} | Shatter
        </title>
        <meta name="description" content="Shatter auth" />
      </Helmet>

      <section className="mdLg:overflow-hidden flex flex-col mdLg:flex-row gap-3 justify-center h-full items-center p-2">
        <CustomLoadingBar />
        <motion.div
          className="flex xs:min-w-[390px] items-center sm:items-start relative h-full w-[100%] mdLg:w-[unset] mdLg:max-w-[35%] overflow-hidden"
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.9 }}
          variants={authFormVariants}
        >
          <SignUp pathname={currentPageName || null} />
          <Login pathname={currentPageName || null} />
        </motion.div>
        <AuthVideoBlock />
      </section>
    </>
  );
}
