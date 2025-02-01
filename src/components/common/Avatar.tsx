import { useMemo } from "react";
import { cn, getInitials } from "@/utils";
import useUser from "@/hooks/useUser";

type TAvatar = {
  src: string | Record<string, string>;
  title: string;
  participant?: string;
  className?: string;
};

const Avatar = ({ src, participant, title, className }: TAvatar) => {
  const user = useUser();
  const chatAvatar = useMemo(() => {
    if (!src) return null;
    if (typeof src === "string") return src;
    return participant && user ? src[user.uid] : "";
  }, [src, participant, user]);

  const avatarClasses = cn(
    "avatar w-full h-full cursor-pointer text-[18px] font-[400] flex overflow-hidden text-center text-white justify-center items-center rounded-full",
    !chatAvatar && "bg-dark",
    className,
  );

  return (
    <div className={avatarClasses}>
      {chatAvatar ? (
        <img
          className="w-full bg-cover h-full object-cover"
          src={chatAvatar}
          draggable={false}
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
