import { Skeleton } from "@/components/ui/shadcn/skeleton";
import { cn } from "@/utils";

interface IMessageSkeletonProps {
  isOwnMessage?: boolean;
}

const MessageSkeleton = ({ isOwnMessage = false }: IMessageSkeletonProps) => {
  const wrapperClassName = cn(
    "message-block flex gap-2 w-fit",
    isOwnMessage && "justify-end self-end flex-row-reverse pr-1",
  );

  const messageClassName = cn(
    "message relative max-w-[300px] px-4 py-2 pt-3 rounded-2xl shadow-lg",
  );

  return (
    <div className={wrapperClassName}>
      <Skeleton className="min-h-[48px] max-h-[48px] max-w-[48px] min-w-[48px] rounded-xl self-end bg-dark bg-opacity-20" />

      <div
        className={cn(
          messageClassName,
          "bg-dark bg-opacity-20 h-[70px] w-[300px]",
        )}
      >
        <Skeleton className="h-[14px] w-3/4 mb-2 bg-dark bg-opacity-15" />
        <Skeleton className="h-[14px] w-1/2 mb-2  bg-dark bg-opacity-15" />
      </div>
    </div>
  );
};

export default MessageSkeleton;
