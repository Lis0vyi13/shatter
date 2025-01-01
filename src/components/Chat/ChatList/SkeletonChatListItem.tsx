import { Skeleton } from "../../ui/shadcn/skeleton";

const SkeletonChatListItem = () => {
  return (
    <div className="flex gap-2 p-2 rounded-xl">
      <Skeleton className="h-[48px] w-[48px] rounded-xl bg-gray" />
      <div className="flex-1 flex mt-2 flex-col gap-[6px]">
        <Skeleton className="h-[14px] w-2/4 bg-gray" />
        <Skeleton className="h-[12px] w-3/4 bg-gray" />
      </div>
      <div className="flex flex-col mt-2 gap-1 items-end">
        <Skeleton className="h-[12px] w-[16px] bg-gray" />
      </div>
    </div>
  );
};

export default SkeletonChatListItem;
