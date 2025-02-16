export const authFormVariants = {
  hidden: { opacity: 0, y: "100%" },
  visible: { opacity: 1, y: "0%" },
  hiddenReverse: { opacity: 0, y: "-100%" },
  visibleReverse: { opacity: 1, y: "0%" },
};

export const authVideoVariants = {
  hidden: { opacity: 0, scale: 0.5, originX: 0, originY: 0 },
  visible: { opacity: 1, scale: 1, originX: 0, originY: 0 },
};

export const authDefaultVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 },
};
