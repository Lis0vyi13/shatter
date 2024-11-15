import { motion } from "framer-motion";

import Block from "@/components/ui/Block";
import CreatePassword from "@/components/Authentication/CreatePassword";

const variants = {
  hidden: { opacity: 0, y: "100%" },
  visible: { opacity: 1, y: "0%" },
  hiddenReverse: { opacity: 0, y: "-100%" },
  visibleReverse: { opacity: 1, y: "0%" },
};

const videoVariants = {
  hidden: { opacity: 0, scale: 0.5, originX: 0, originY: 0 },
  visible: { opacity: 1, scale: 1, originX: 0, originY: 0 },
};

const CreatePasswordPage = () => {
  return (
    <section className="login-page overflow-hidden flex flex-col mdLg:flex-row gap-3 justify-center h-full items-center p-4">
      <motion.div
        className="flex relative h-full w-[100%] mdLg:w-[unset] min-w-[30%] overflow-hidden"
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.9 }}
        variants={variants}
      >
        <CreatePassword />
      </motion.div>
      <motion.div
        className="text-white h-full hidden mdLg:block"
        initial="hiddenReverse"
        animate="visibleReverse"
        transition={{ duration: 0.9 }}
        variants={variants}
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
            variants={videoVariants}
            style={{ width: "100%", height: "100%", originX: 0, originY: 0 }}
          />
        </Block>
      </motion.div>
    </section>
  );
};

export default CreatePasswordPage;
