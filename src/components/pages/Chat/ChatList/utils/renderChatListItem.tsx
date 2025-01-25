import { Dispatch, SetStateAction } from "react";
import { HTMLMotionProps, motion } from "framer-motion";
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
  setDeletingChat: Dispatch<SetStateAction<string>>;
  handleChatSelection: (chat: IChat) => () => void;
  searchInputValue: string;
}

interface CustomMotionProps extends HTMLMotionProps<"li"> {
  "data-rfd-drag-handle-draggable-id"?: string;
  "data-rfd-drag-handle-context-id"?: string;
}

const renderChatListItem = ({
  chat,
  index,
  isChatPinned,
  activeChat,
  deletingChat,
  setDeletingChat,
  handleChatSelection,
  searchInputValue,
}: RenderChatItemProps) => {
  const isActive = chat.id === activeChat;
  const setChatHandler = handleChatSelection(chat);

  const isDeleting = deletingChat === chat.id;
  const { listItemClasses, motionListItemProps } =
    getChatListItemClasses(isDeleting);

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
    <ChatListItemMenu onDelete={setDeletingChat} data={chat} key={chat.id}>
      {isChatPinned ? (
        <Draggable key={chat.id} draggableId={chat.id} index={index}>
          {(provided) => (
            <motion.li
              className={cn(listItemClasses)}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...(provided.dragHandleProps as unknown as CustomMotionProps)}
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
