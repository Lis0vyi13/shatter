import { Skeleton } from "@/components/ui/shadcn/skeleton";

const ChatTitleSkeleton = () => {
  return (
    <Skeleton className="h-[32px] w-[200px] rounded-xl bg-dark bg-opacity-20" />
  );
};

export default ChatTitleSkeleton;
