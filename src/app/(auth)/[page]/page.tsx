"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

import Login from "@/components/Authentication/Login";
import SignUp from "@/components/Authentication/SignUp";
import Block from "@/components/ui/Block";
import Loader from "@/components/ui/Loader";
import { authFormVariants, authVideoVariants } from "@/constants/animations";

export default function AuthPage() {
  const pathname = usePathname();
  const currentPageName = pathname?.split("/").at(-1);

  return (
    <section className="login-page overflow-x-hidden flex flex-col mdLg:flex-row gap-3 justify-center h-full items-center p-4">
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
      <motion.div
        className="text-white h-full hidden mdLg:block"
        initial="hiddenReverse"
        animate="visibleReverse"
        transition={{ duration: 0.9 }}
        variants={authFormVariants}
      >
        <Block className="min-h-full px-0 py-0 overflow-hidden" color="dark">
          <Suspense fallback={<Loader />}>
            <motion.video
              className="min-h-full object-cover opacity-100"
              autoPlay
              loop
              muted
              src="/login-video.mp4"
              initial="hidden"
              animate="visible"
              transition={{
                duration: 0.9,
                delay: 0.4,
              }}
              variants={authVideoVariants}
              style={{ width: "100%", height: "100%", originX: 0, originY: 0 }}
            />
          </Suspense>
        </Block>
      </motion.div>
    </section>
  );
}
