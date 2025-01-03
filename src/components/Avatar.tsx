import { useMemo } from "react";
import Image, { StaticImageData } from "next/image";
import { getInitials } from "@/utils";

type TAvatar = {
  avatar:
    | string
    | StaticImageData
    | {
        [key: string]: string;
      };
  title: string;
  collocutor?: string;
  className?: string;
};

const Avatar = ({ avatar, collocutor, title, className }: TAvatar) => {
  const chatAvatar = useMemo(() => {
    if (!avatar) return null;
    if (typeof avatar === "string") return avatar;
    if ("src" in avatar) return avatar as StaticImageData;
    return collocutor ? avatar[collocutor] : "";
  }, [avatar, collocutor]);

  return (
    <div
      className={`avatar cursor-pointer text-[18px] font-[400] flex overflow-hidden text-center text-white justify-center items-center ${
        chatAvatar ? "" : "bg-dark"
      } rounded-xl ${className}`}
    >
      {chatAvatar ? (
        <Image
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
