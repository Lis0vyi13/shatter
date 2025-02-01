import { Skeleton } from "@/components/ui/shadcn/skeleton";

const UsersOnlineCardSkeleton = () => {
  return (
    <>
      <div className="flex flex-col overflow-hidden text-center pt-1 pb-[6px] px-1 gap-[6px]">
        <div className="mx-auto">
          <Skeleton className="w-12 h-12 rounded-full bg-dark bg-opacity-20 animate-pulse" />
        </div>

        <Skeleton className="w-10 h-2 mb-1 mx-auto bg-dark bg-opacity-20 animate-pulse" />
      </div>
    </>
  );
};

export default UsersOnlineCardSkeleton;
