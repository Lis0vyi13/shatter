import { Suspense } from "react";
import { motion } from "framer-motion";

import Block from "@/components/ui/Block";
import Loader from "@/components/ui/Loader";

import { authFormVariants, authVideoVariants } from "@/constants/animations";

const AuthVideoBlock = () => (
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
          transition={{ duration: 0.9, delay: 0.4 }}
          variants={authVideoVariants}
          style={{ width: "100%", height: "100%", originX: 0, originY: 0 }}
        />
      </Suspense>
    </Block>
  </motion.div>
);

export default AuthVideoBlock;
