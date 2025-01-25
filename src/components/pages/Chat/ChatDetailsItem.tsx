import { ReactElement, ElementType } from "react";

interface IChatDetailsItem {
  detail: {
    title: string;
    Icon: ElementType;
    iconSize?: number;
  };
  value: number;
}

const ChatDetailsItem = ({ detail, value }: IChatDetailsItem): ReactElement => {
  const IconComponent = detail.Icon;
  return (
    <div className="chat-details__item flex items-center gap-3">
      <IconComponent size={detail.iconSize || 16} />
      <div className="flex gap-1 text-[14px]">
        <span>{value}</span>
        <span>{detail.title}</span>
      </div>
    </div>
  );
};

export default ChatDetailsItem;
