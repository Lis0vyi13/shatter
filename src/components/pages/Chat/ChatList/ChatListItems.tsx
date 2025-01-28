import { MutableRefObject } from "react";
import { Droppable } from "@hello-pangea/dnd";
import { useAppSelector } from "@/redux/app/hooks";

import useChatListItems from "./hooks/useChatListItems";
import renderChatListItem from "./utils/renderChatListItem";

import NotFound from "./NotFound";

import { IChat } from "@/types/chat";

interface ChatListItemsProps {
  chats: IChat[] | null;
  listRef: MutableRefObject<HTMLDivElement | null>;
  activeChat: string | undefined;
  handleSetActiveChat: (id: string) => void;
  handleCreateNewChat: (chatData: IChat) => void;
}

const ChatListItems = ({
  chats,
  listRef,
  activeChat,
  handleSetActiveChat,
  handleCreateNewChat,
}: ChatListItemsProps) => {
  const searchInputValue = useAppSelector(
    (store) => store.search.searchInput.value
  );
  const debouncedSearchInputValue = useAppSelector(
    (store) => store.search.searchInput.debouncedValue
  );
  const loading = useAppSelector((store) => store.chat.isLoading);

  const {
    handleChatSelection,
    renderSkeletons,
    pinnedChats,
    unpinnedChats,
    onDelete,
    deletingChat,
  } = useChatListItems({
    chats,
    listRef,
    handleSetActiveChat,
    handleCreateNewChat,
  });

  if (loading || !chats) {
    return <ul className="list flex flex-col">{renderSkeletons()}</ul>;
  }

  if (chats.length === 0) {
    return (
      <NotFound value={debouncedSearchInputValue} className="mt-8 text-l" />
    );
  }
  console.log(pinnedChats.map((chat) => [chat.title, chat.order]));

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
                  onDelete,
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
            index: index + pinnedChats.length,
            isChatPinned: false,
            activeChat,
            deletingChat,
            onDelete,
            handleChatSelection,
            searchInputValue,
          })
        )}
      </ul>
    </div>
  );
};

export default ChatListItems;
