import { motion } from "framer-motion";
import { Draggable } from "@hello-pangea/dnd";

import getChatListItemClasses from "./getChatListItemClasses";

import { ChatListItemMenu } from "@/components/ui/Menus/ChatListItemMenu";
import ChatListItem from "../ChatListItem";

import { IChat } from "@/types/chat";
import { cn } from "@/utils";

interface RenderChatItemProps {
  chat: IChat;
  index: number;
  isChatPinned: boolean;
  activeChat: string | undefined;
  deletingChat: string;
  onDelete: (chatId: string) => void;
  handleChatSelection: (chat: IChat) => () => void;
  searchInputValue: string;
}

const renderChatListItem = ({
  chat,
  index,
  isChatPinned,
  activeChat,
  deletingChat,
  onDelete,
  handleChatSelection,
  searchInputValue,
}: RenderChatItemProps) => {
  const isActive = chat.id === activeChat;
  const setChatHandler = handleChatSelection(chat);
  const isDeleted = deletingChat === chat.id;
  const { listItemClasses, motionListItemProps } =
    getChatListItemClasses(isDeleted);

  return searchInputValue !== "" ? (
    <li key={chat.id}>
      <ChatListItem
        {...chat}
        index={index}
        isActive={isActive}
        setChat={setChatHandler}
      />
    </li>
  ) : (
    <ChatListItemMenu onDelete={onDelete} data={chat} key={chat.id}>
      {isChatPinned ? (
        <Draggable key={chat.id} draggableId={chat.id} index={index}>
          {(provided) => (
            <li
              className={cn(listItemClasses)}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <ChatListItem
                {...chat}
                index={index}
                isActive={isActive}
                setChat={setChatHandler}
              />
            </li>
          )}
        </Draggable>
      ) : (
        <motion.li
          key={chat.id}
          className="max-h-16 transition-none overflow-hidden"
          {...motionListItemProps}
        >
          <ChatListItem
            {...chat}
            index={index}
            isActive={isActive}
            setChat={setChatHandler}
          />
        </motion.li>
      )}
    </ChatListItemMenu>
  );
};

export default renderChatListItem;
