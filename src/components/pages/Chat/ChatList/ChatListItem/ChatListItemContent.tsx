import { useEffect, useMemo, useState } from "react";

import { getUserById, getUserStatus } from "@/services/user";
import { getLanguage, getTimeAgo } from "@/utils";

import Avatar from "@/components/common/Avatar";
import LastMessage from "@/components/pages/Chat/ChatList/LastMessage";
import Title from "@/components/ui/Title";
import ChatListItemStatus from "./ChatListItemStatus";

import { IChat } from "@/types/chat";
import { IUser, IUserStatus } from "@/types/user";
import { useLastMessage } from "@/hooks/useLastMessage";

interface IChatListItemContent {
  user: IUser | null;
  chat: IChat | null;
  isUserChatMember: boolean;
}

const ChatListItemContent = (props: IChatListItemContent) => {
  const [userStatus, setUserStatus] = useState<IUserStatus | null>(null);
  const [participant, setParticipant] = useState<IUser | null>(null);
  const { chat, user } = props;

  const lastMessage = useLastMessage(chat?.id || null);

  const chatTitle =
    user && (participant || chat)
      ? (participant?.displayName || chat?.title[user.uid])!
      : "User";

  const participantId = useMemo(() => {
    if (!chat || !user || !chat.members || "userId" in chat.members) return;
    const memberIds = Object.keys(chat.members);
    return memberIds.find((id) => id !== user.uid);
  }, [chat, user]);

  useEffect(() => {
    const fetchUserStatus = async () => {
      if (!participantId) return;
      const status = await getUserStatus(participantId);
      setUserStatus(status);
    };

    const getUser = async () => {
      if (!participantId) return;
      const participant = await getUserById(participantId!);
      setParticipant(participant);
    };
    fetchUserStatus();
    getUser();
  }, [participantId]);

  const titleLang = getLanguage(chatTitle);
  return chat ? (
    <>
      <Avatar
        className="min-h-[48px] max-h-[48px] max-w-[48px] min-w-[48px]"
        src={participant?.photoUrl || ""}
        participant={participantId}
        title={chatTitle}
      />
      <div className="user-info flex flex-1 mt-[1px] flex-col gap-[6px] overflow-hidden">
        <Title lang={titleLang} className="text-[14px] mt-1">
          {chatTitle}
        </Title>
        {userStatus && !props.isUserChatMember ? (
          <LastMessage
            className="pt-[1px]"
            data={{
              message: `was ${getTimeAgo(userStatus.updatedAt)}`,
              id: chat.id,
              chatType: chat.chatType,
              text: lastMessage?.text || "",
              senderId: lastMessage?.senderId || "",
              type: lastMessage?.type || "text",
              timestamp: lastMessage?.timestamp || 0,
            }}
          />
        ) : (
          <LastMessage
            data={{
              ...lastMessage,
              chatType: chat.chatType,
              id: chat.id,
              text: lastMessage?.text || "",
              senderId: lastMessage?.senderId || "",
              type: lastMessage?.type || "text",
              timestamp: lastMessage?.timestamp || 0,
            }}
          />
        )}
      </div>
      <ChatListItemStatus {...props} time={lastMessage?.timestamp!} />
    </>
  ) : null;
};

export default ChatListItemContent;
