import { useState } from "react";
import { Droppable } from "@hello-pangea/dnd";
import { useAppSelector } from "@/redux/app/hooks";

import useChatListItems from "./hooks/useChatListItems";
import renderChatListItem from "./utils/renderChatListItem";

import { IChat } from "@/types/chat";

interface ChatListItemsProps {
  chats: IChat[] | null;
  activeChat: string | undefined;
  setActiveChat: (id: string) => void;
  createNewChat: (chatData: IChat) => void;
  loading: boolean;
}

const ChatListItems = ({
  chats,
  activeChat,
  setActiveChat,
  createNewChat,
  loading,
}: ChatListItemsProps) => {
  const searchInputValue = useAppSelector(
    (store) => store.search.searchInput.value
  );
  const [deletingChat, setDeletingChat] = useState("");

  const { handleChatSelection, renderSkeletons, getSortedChats } =
    useChatListItems({
      chats,
      setActiveChat,
      createNewChat,
    });
  const { pinnedChats, unpinnedChats } = getSortedChats;
  if (loading || !chats) {
    return <ul className="list flex flex-col">{renderSkeletons()}</ul>;
  }

  return (
    <div className="flex flex-col">
      {pinnedChats.length > 0 && (
        <Droppable droppableId="pinnedChatsDroppable">
          {(provided) => (
            <ul
              className="list flex flex-col"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {pinnedChats.map((chat, index) =>
                renderChatListItem({
                  chat,
                  index,
                  isChatPinned: true,
                  activeChat,
                  deletingChat,
                  setDeletingChat,
                  handleChatSelection,
                  searchInputValue,
                })
              )}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      )}

      <ul className="list flex flex-col">
        {unpinnedChats.map((chat, index) =>
          renderChatListItem({
            chat,
            index,
            isChatPinned: false,
            activeChat,
            deletingChat,
            setDeletingChat,
            handleChatSelection,
            searchInputValue,
          })
        )}
      </ul>
    </div>
  );
};

export default ChatListItems;
