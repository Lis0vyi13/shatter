import { useEffect, useMemo, useState } from "react";

import { getUserStatus } from "@/services/user";
import { getTimeAgo } from "@/utils";

import Avatar from "@/components/common/Avatar";
import LastMessage from "@/components/pages/Chat/ChatList/LastMessage";
import Title from "@/components/ui/Title";
import ChatListItemStatus from "./ChatListItemStatus";

import { IChat } from "@/types/chat";
import { IUser, IUserStatus } from "@/types/user";

interface IChatListItemContent {
  user: IUser | null;
  chat: IChat | null;
  isUserChatMember: boolean;
}

const ChatListItemContent = (props: IChatListItemContent) => {
  const [userStatus, setUserStatus] = useState<IUserStatus | null>(null);
  const { chat, user } = props;
  console.log(chat?.avatar);
  const chatTitle = user && chat ? chat.title[user.uid] : "User";

  const participantId = useMemo(() => {
    if (!chat || !user) return;
    return chat.members.find((id) => id !== user.uid);
  }, [chat, user]);

  useEffect(() => {
    const fetchUserStatus = async () => {
      if (!participantId) return;
      const status = await getUserStatus(participantId);
      setUserStatus(status);
    };
    fetchUserStatus();
  }, [participantId, chat?.members]);

  return chat ? (
    <>
      <Avatar
        className="min-h-[48px] max-h-[48px] max-w-[48px] min-w-[48px]"
        src={chat.avatar}
        participant={participantId}
        title={chatTitle}
      />
      <div className="user-info flex flex-1 mt-[1px] flex-col gap-[6px] overflow-hidden">
        <Title className="text-[14px] mt-1">{chatTitle}</Title>
        {userStatus && !props.isUserChatMember ? (
          <LastMessage
            className="pt-[1px]"
            data={{
              message: `was ${getTimeAgo(userStatus.updatedAt)}`,
              id: chat.id,
              chatType: chat.chatType,
            }}
          />
        ) : (
          <LastMessage
            data={{ ...chat.lastMessage, chatType: chat.chatType, id: chat.id }}
          />
        )}
      </div>
      <ChatListItemStatus {...props} />
    </>
  ) : null;
};

export default ChatListItemContent;
