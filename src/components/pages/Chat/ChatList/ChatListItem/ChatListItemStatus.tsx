import { formatTimestampToDate } from "@/utils";

import Counter from "@/components/ui/Counter";

import { IChat } from "@/types/chat";
import { IUser } from "@/types/user";
import { TiPin } from "react-icons/ti";

interface IChatListItemStatus {
  user: IUser | null;
  chat: IChat | null;
  time: number | undefined;
  isUserChatMember: boolean;
}

const ChatListItemStatus = ({
  user,
  chat,
  time,
  isUserChatMember,
}: IChatListItemStatus) => {
  const duration = time ? formatTimestampToDate(time) : null;

  return (
    <div className="flex flex-col items-end gap-1 mt-[1px]">
      {chat?.id && isUserChatMember && (
        <strong className="text-[12px] mt-[5px] font-normal opacity-80">
          {duration}
        </strong>
      )}
      <div className="flex gap-1 items-center">
        {user && chat && chat.unreadMessages[user.uid] > 0 && (
          <Counter>{chat?.unreadMessages[user.uid]}</Counter>
        )}
        {user && chat?.isPin?.includes(user.uid) && (
          <TiPin className="text-blue text-[20px]" />
        )}
      </div>
    </div>
  );
};

export default ChatListItemStatus;
