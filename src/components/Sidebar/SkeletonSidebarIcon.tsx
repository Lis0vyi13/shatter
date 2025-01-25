import { Skeleton } from "../ui/shadcn/skeleton";

const SkeletonSidebarIcon = () => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <Skeleton className="h-[20px] bg-skeleton w-[23px] rounded-md" />
      <Skeleton className="h-[6px] bg-skeleton w-[45px] rounded-sm" />
    </div>
  );
};

export default SkeletonSidebarIcon;
