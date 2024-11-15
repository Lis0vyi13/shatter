import { ILastMessage, TChatType } from "@/types/chat";

interface ILastMessageProps {
  data: ILastMessage & { id: string; chatType: TChatType };
}

const LastMessage = ({ data }: ILastMessageProps) => {
  const findUserById = (_id: string) => {
    return "Test user";
  };
  const isSender = data.by === data.id;
  const isAction = data.type === "action";
  const sender = findUserById(data.id);

  return (
    <strong
      className={`last-message font-normal text-[12px] line-clamp-1 ${
        isAction ? "text-blue" : "text-dark text-opacity-70"
      }`}
    >
      {!isAction && isSender && <span className="text-blue">You: </span>}
      {data.chatType === "group"
        ? `${sender} ${data.message || "No messages found"}`
        : data.message || "No messages found"}
    </strong>
  );
};

export default LastMessage;
