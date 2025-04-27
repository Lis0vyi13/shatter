import { cn } from "@/utils";
import useUser from "@/hooks/useUser";

import Avatar from "@/components/common/Avatar";

import { IUser } from "@/types/user";
// import { IMessage } from "@/types/chat";
import { Message as TMessage } from "@/hooks/useChat";

type TAvatar = string | Record<string, string>;

interface IMessageProps {
  data: TMessage;
  participantTitle: string;
  participantAvatar: TAvatar;
}

const Message = ({
  data,
  participantTitle,
  participantAvatar,
}: IMessageProps) => {
  const currentUser = useUser() as IUser;
  const isOwnMessage = currentUser?.uid === data.senderId;

  const title = isOwnMessage
    ? currentUser.displayName || ""
    : participantTitle || "";
  const avatar = isOwnMessage ? currentUser.photoUrl || "" : participantAvatar;

  const wrapperClassName = cn(
    "message-block flex gap-2 w-fit",
    isOwnMessage && "justify-end self-end flex-row-reverse pr-1",
  );

  const messageClassName = cn(
    "message relative max-w-[300px] px-4 py-2 pt-3 rounded-2xl shadow-lg",
    isOwnMessage ? "bg-blue text-white" : "bg-[#e0e0f9] text-[#000]",
  );

  const bubbleWrapperClassName = cn(
    "absolute bottom-0 scale-y-[-1]",
    isOwnMessage ? "right-[-5px]" : "left-[-8px] scale-x-[-1]",
  );

  const bubbleClassName = cn(
    "w-0 h-0 border-t-[18px] border-r-[18px] border-r-transparent",
    isOwnMessage ? "border-t-blue" : "border-t-[#e0e0f9]",
  );

  return (
    <div className={wrapperClassName}>
      <Avatar
        src={avatar}
        participant={data.receiverId}
        title={title}
        className="min-h-[48px] max-h-[48px] max-w-[48px] min-w-[48px] self-end"
      />

      <div className={messageClassName}>
        <p className="text-[12px] leading-[18px] font-[300]">{data.text}</p>
        <div className="flex mt-[2px] items-center justify-end text-sm text-gray-200">
          <span className="text-[11px] font-[400]">09:27</span>
        </div>
        <div className={bubbleWrapperClassName}>
          <div className={bubbleClassName} />
        </div>
      </div>
    </div>
  );
};

export default Message;
