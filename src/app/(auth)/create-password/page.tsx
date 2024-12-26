"use client";

import { motion } from "framer-motion";

import Block from "@/components/ui/Block";
import CreatePassword from "@/components/Authentication/CreatePassword";
import { authFormVariants, authVideoVariants } from "@/constants/animations";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";
import { useEffect, useRef } from "react";

const CreatePasswordPage = () => {
  const loadingBarRef = useRef<LoadingBarRef>(null);

  useEffect(() => {
    loadingBarRef.current?.continuousStart();

    const timer = setTimeout(() => {
      loadingBarRef.current?.complete();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="login-page overflow-hidden flex flex-col mdLg:flex-row gap-3 justify-center h-full items-center p-4">
      <LoadingBar
        color="#7678ed"
        height={3}
        shadow={true}
        ref={loadingBarRef}
      />
      <motion.div
        className="flex relative h-full w-[100%] mdLg:w-[unset] min-w-[30%] overflow-hidden"
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.9 }}
        variants={authFormVariants}
      >
        <CreatePassword />
      </motion.div>
      <motion.div
        className="text-white h-full hidden mdLg:block"
        initial="hiddenReverse"
        animate="visibleReverse"
        transition={{ duration: 0.9 }}
        variants={authFormVariants}
      >
        <Block className="min-h-full px-0 py-0" color="dark">
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
        </Block>
      </motion.div>
    </section>
  );
};

export default CreatePasswordPage;
