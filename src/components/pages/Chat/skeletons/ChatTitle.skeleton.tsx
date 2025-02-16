import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/shadcn/skeleton";
import { fadeIn } from "@/constants/animations";

const ChatTitleSkeleton = () => {
  return (
    <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
      <Skeleton className="h-[32px] w-[200px] rounded-xl bg-dark bg-opacity-20" />
    </motion.div>
  );
};

export default ChatTitleSkeleton;
