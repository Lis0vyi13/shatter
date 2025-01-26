import { cn } from "@/utils";
import { Variants } from "framer-motion";

const getChatListItemClasses = (isDeleting: boolean) => {
  const listItemClasses = cn(
    "overflow-hidden",
    isDeleting
      ? "transition-all max-h-0 opacity-0 scale-95 duration-500 transform -translate-x-full"
      : "max-h-96"
  );

  const transition = {
    duration: 0.4,
    ease: "easeInOut",
  };

  const motionListItemProps: Variants = {
    initial: {
      opacity: 1,
      x: 0,
      height: "4rem",
    },
    animate: {
      opacity: isDeleting ? 0 : 1,
      x: isDeleting ? "-100%" : 0,
      height: isDeleting ? 0 : "4rem",
    },
    exit: {
      opacity: 0,
      x: "-100%",
      height: 0,
    },
    transition,
  };

  return { listItemClasses, motionListItemProps };
};

export default getChatListItemClasses;
