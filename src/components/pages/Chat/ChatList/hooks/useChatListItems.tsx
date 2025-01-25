import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import useUser from "@/hooks/useUser";

import SkeletonChatListItem from "../SkeletonChatListItem";

import { IChat } from "@/types/chat";

interface IUseChatListItems {
  chats: IChat[] | null;
  setActiveChat: (id: string) => void;
  createNewChat: (chatData: IChat) => void;
}

const useChatListItems = ({
  chats,
  setActiveChat,
  createNewChat,
}: IUseChatListItems) => {
  const user = useUser();
  const navigate = useNavigate();

  const getSortedChats = useMemo(() => {
    if (!chats || !user) return { pinnedChats: [], unpinnedChats: [] };
    return chats.reduce(
      (acc, chat) => {
        if (chat.isPin.includes(user.uid)) {
          acc.pinnedChats.push(chat);
        } else {
          acc.unpinnedChats.push(chat);
        }
        return acc;
      },
      { pinnedChats: [] as IChat[], unpinnedChats: [] as IChat[] }
    );
  }, [chats, user]);

  const handleChatSelection = useCallback(
    (chat: IChat) =>
      chat.chatType === "none"
        ? async () => {
            await createNewChat(chat);
            navigate("/c/" + chat.id);
          }
        : () => {
            setActiveChat(chat.id);
          },
    [setActiveChat, createNewChat]
  );

  const renderSkeletons = () =>
    Array.from({ length: 9 }).map((_, index) => (
      <SkeletonChatListItem key={index} />
    ));

  return { getSortedChats, handleChatSelection, renderSkeletons };
};

export default useChatListItems;