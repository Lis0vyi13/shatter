import { AnimatePresence, motion } from "framer-motion";
import Logo from "../common/Logo";

const FullScreenLoader = () => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed transition-all inset-0 flex flex-col items-center justify-center bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="relative w-32 h-32"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Logo className="w-32 h-32 animate-spin" />
        </motion.div>
        <motion.p
          className="text-white text-lg mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          Loading...
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
};

export default FullScreenLoader;
