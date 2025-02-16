import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Button from "@/components/ui/Buttons/Button";
import Title from "@/components/ui/Title";
import Logo from "@/components/common/Logo";

import { fadeIn } from "@/constants/animations";

const Home = () => {
  return (
    <>
      <motion.header
        className="py-4 flex justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Link to={"/"}>
          <Logo width={40} height={40} />
        </Link>
        <Link className="rounded-xl" to="/login">
          <Button className="w-full text-[14px] border-2 rounded-xl hover:bg-blue">
            Login / Signup
          </Button>
        </Link>
      </motion.header>
      <motion.main
        className="mt-40 flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Title className="text-center text-4xl xs:text-5xl line-clamp-none">
          Connect with your mate easily
        </Title>
        <motion.h2
          className="text-center mt-12 max-w-[700px] leading-6 font-[400] text-[14px] xs:text-[16px]"
          {...fadeIn}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Shatter is a communication application between friends, family and
          learn at the same time wrapped in one user-friendly application
        </motion.h2>
        <motion.div
          className="buttons mt-8 mb-4 text-[14px] flex items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Link className="rounded-xl w-[150px]" to="/sign-up">
            <Button className="w-full border-2 rounded-xl py-3 bg-blue hover:bg-opacity-40">
              Get started
            </Button>
          </Link>
        </motion.div>
      </motion.main>
    </>
  );
};

export default Home;
