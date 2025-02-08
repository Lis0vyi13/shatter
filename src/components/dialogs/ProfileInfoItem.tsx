import { LucideLoaderCircle } from "lucide-react";
import { ReactNode } from "react";

const ProfileInfoItem = ({
  title,
  value,
}: {
  title: string;
  value: string | ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-gray text-[11px]">{title}</span>
      <span className="text-[12px]">
        {value || (
          <LucideLoaderCircle size={20} className="-ml-1 animate-spin" />
        )}
      </span>
    </div>
  );
};

export default ProfileInfoItem;
