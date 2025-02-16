import { motion } from "framer-motion";
import { cn } from "@/utils";

import { Skeleton } from "@/components/ui/shadcn/skeleton";

import { fadeIn } from "@/constants/animations";

interface IMessageSkeletonProps {
  isOwnMessage?: boolean;
}

const messageClassName =
  "message relative max-w-[300px] px-4 py-2 pt-3 rounded-2xl shadow-lg";

const MessageSkeleton = ({ isOwnMessage = false }: IMessageSkeletonProps) => {
  const wrapperClassName = cn(
    "message-block flex gap-2 w-fit",
    isOwnMessage && "justify-end self-end flex-row-reverse pr-1",
  );

  return (
    <motion.div
      {...fadeIn}
      transition={{ delay: 0.2 }}
      className={wrapperClassName}
    >
      <Skeleton className="min-h-[48px] max-h-[48px] max-w-[48px] min-w-[48px] rounded-xl self-end bg-dark bg-opacity-10" />

      <div
        className={cn(
          messageClassName,
          "bg-dark bg-opacity-10 h-[70px] w-[300px]",
        )}
      >
        <Skeleton className="h-[14px] w-3/4 mb-2 bg-gray bg-opacity-30" />
        <Skeleton className="h-[14px] w-1/2 mb-2 bg-gray bg-opacity-30" />
      </div>
    </motion.div>
  );
};

export default MessageSkeleton;
