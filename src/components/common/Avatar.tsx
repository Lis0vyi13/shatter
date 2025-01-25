import { useMemo } from "react";
import { cn, getInitials } from "@/utils";

type TAvatar = {
  avatar: string | Record<string, string>;
  title: string;
  collocutor?: string;
  className?: string;
};

const Avatar = ({ avatar, collocutor, title, className }: TAvatar) => {
  const chatAvatar = useMemo(() => {
    if (!avatar) return null;
    if (typeof avatar === "string") return avatar;
    return collocutor ? avatar[collocutor] : "";
  }, [avatar, collocutor]);

  const avatarClasses = cn(
    "avatar cursor-pointer text-[18px] font-[400] flex overflow-hidden text-center text-white justify-center items-center rounded-xl",
    !chatAvatar && "bg-dark",
    className
  );

  return (
    <div className={avatarClasses}>
      {chatAvatar ? (
        <img
          className="w-full bg-cover h-full object-cover"
          src={chatAvatar}
          width={48}
          title={title}
          height={48}
          alt={title as string}
        />
      ) : (
        <span title={title}>{getInitials(title as string)}</span>
      )}
    </div>
  );
};

export default Avatar;
