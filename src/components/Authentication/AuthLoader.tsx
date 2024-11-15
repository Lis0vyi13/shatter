import { motion } from "framer-motion";

import LoadingIndicator from "../LoadingIndicator";
import Logo from "../Logo";
import ProgressBar from "../ProgressBar";

interface IAuthLoaderProps {
  value: number;
}

const AuthLoader = (props: IAuthLoaderProps) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="loader fixed left-0 top-0 min-w-full min-h-full flex items-center justify-center z-10 bg-dark"
    >
      <div className="content flex flex-col items-center justify-center text-center px-4">
        <div className="logo -mt-16">
          <Logo height={28} width={28} />
        </div>
        <div className="pt-4">
          <h1 className="relative mt-3 text-white text-[20px] xs:text-[28px] leading-8">
            We create an account, wait
            <span className="ellipsis absolute right-0 bottom-[4px]  xs:bottom-[-2px] translate-x-[105%]" />
          </h1>
          <span className="text-gray inline-block pt-2 text-[11px] xs:text-[14px]">
            Break the Silence, Spark the Conversation
          </span>
        </div>
        <div className="progress-bar mt-7 w-[min(200px,_100%)]">
          <ProgressBar value={props.value} />
        </div>
        <div className="indicator flex-1 mt-12 flex items-end">
          <LoadingIndicator value={props.value} />
        </div>
      </div>
    </motion.section>
  );
};

export default AuthLoader;
