import { cn } from "@/utils";
import { ILastMessage, TChatType } from "@/types/chat";

interface ILastMessageProps {
  data: ILastMessage & { id: string; chatType: TChatType };
  className?: string;
}

const LastMessage = ({ data, className }: ILastMessageProps) => {
  const findUserById = (id: string) => {
    return id;
  };

  const isSender = data.by === data.id;
  const isAction = data.type === "action";
  const sender = findUserById(data.id);

  const messageClassName = cn(
    "last-message font-normal text-[12px] line-clamp-1",
    isAction ? "text-blue" : "text-dark text-opacity-70",
    className
  );

  return (
    <strong className={messageClassName}>
      {!isAction && isSender && <span className="text-blue">You: </span>}
      {data.chatType === "group"
        ? `${sender} ${data.message || "No messages found"}`
        : data.message || "No messages found"}
    </strong>
  );
};

export default LastMessage;
