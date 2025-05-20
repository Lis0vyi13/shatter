import { cn } from "@/utils";
import { ILastMessage } from "@/types/chat";
import useUser from "@/hooks/useUser";

interface ILastMessageProps {
  data: ILastMessage;
  className?: string;
}

const LastMessage = ({ data, className }: ILastMessageProps) => {
  const user = useUser();
  const currentUserId = user?.uid;
  const isSender = currentUserId === data.senderId;
  const isAction = data.type === "action";

  const messageClassName = cn(
    "last-message font-normal text-[12px] line-clamp-1",
    isAction ? "text-blue" : "text-dark text-opacity-70",
    className,
  );
  return (
    <strong className={messageClassName}>
      {!isAction && isSender && <span className="text-blue">You: </span>}
      {data.chatType === "group" && !isSender && (
        <span className="text-dark text-opacity-70">{data.senderId}: </span>
      )}
      {data.text || "No messages found"}
    </strong>
  );
};

export default LastMessage;
