import { MutableRefObject, useState } from "react";
import { useNavigate } from "react-router-dom";

import useUser from "@/hooks/useUser";

import SkeletonChatListItem from "../ChatListItem/ChatListItem.skeleton";

import { IChat } from "@/types/chat";
import { scrollToChatLink } from "@/utils";

interface IUseChatListItems {
  chats: IChat[] | null;
  listRef: MutableRefObject<HTMLDivElement | null>;
  handleSetActiveChat: (id: string) => void;
  handleCreateNewChat: (chatData: IChat) => void;
}

const useChatListItems = ({
  chats,
  listRef,
  handleSetActiveChat,
  handleCreateNewChat,
}: IUseChatListItems) => {
  const user = useUser();
  const navigate = useNavigate();
  const [deletingChat, setDeletingChat] = useState("");

  const onDelete = async (chatId: string) => {
    setDeletingChat(chatId);
  };

  const getSortedChats = () => {
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
      { pinnedChats: [] as IChat[], unpinnedChats: [] as IChat[] },
    );
  };

  const handleChatSelection = (chat: IChat) =>
    chat.chatType === "none"
      ? async () => {
          await handleCreateNewChat(chat);
          navigate(`/c/${chat.id}`);
        }
      : () => {
          handleSetActiveChat(chat.id);
          scrollToChatLink(listRef, chat.id);
        };

  const renderSkeletons = () =>
    Array.from({ length: 9 }).map((_, index) => (
      <SkeletonChatListItem key={index} />
    ));

  const { pinnedChats, unpinnedChats } = getSortedChats();

  return {
    pinnedChats,
    unpinnedChats,
    handleChatSelection,
    renderSkeletons,
    deletingChat,
    onDelete,
  };
};

export default useChatListItems;
