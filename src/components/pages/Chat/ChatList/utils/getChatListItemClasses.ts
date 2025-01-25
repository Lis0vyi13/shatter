import { cn } from "@/utils";
import { Transition, Variants } from "framer-motion";

const getChatListItemClasses = (isDeleting: boolean) => {
  const listItemClasses = cn(
    "transition-none ",
    isDeleting && "-translate-x-full"
  );

  const transition: Transition = {
    type: "tween",
    duration: 0.3,
    ease: "easeOut",
    maxHeight: {
      type: "tween",
      duration: 0.3,
      delay: isDeleting ? 0.3 : 0,
    },
  };

  const motionListItemProps: Variants = {
    initial: { x: 0, maxHeight: "4rem" },
    animate: {
      x: isDeleting ? "-100%" : 0,
      maxHeight: isDeleting ? 0 : "4rem",
    },
    exit: { x: "-100%", maxHeight: 0 },
    transition,
  };

  return { listItemClasses, motionListItemProps };
};

export default getChatListItemClasses;
