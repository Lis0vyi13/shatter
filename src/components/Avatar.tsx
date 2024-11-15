import { getInitials } from "@/utils";
import Image, { StaticImageData } from "next/image";

type TAvatar = {
  avatar?: string | StaticImageData;
  title?: string;
  className?: string;
};

const Avatar = ({ avatar, title, className }: TAvatar) => {
  return (
    <div
      className={`avatar cursor-pointer text-[18px] font-[400] flex overflow-hidden text-center text-white justify-center items-center ${
        avatar ? "" : "bg-dark"
      } rounded-xl ${className}`}
    >
      {avatar ? (
        <Image
          className="w-full bg-cover h-full object-cover"
          src={avatar}
          width={48}
          height={48}
          alt="USER"
        />
      ) : (
        getInitials(title as string)
      )}
    </div>
  );
};

export default Avatar;
