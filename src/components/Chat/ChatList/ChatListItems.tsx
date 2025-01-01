"use client";

import { Droppable, Draggable } from "@hello-pangea/dnd";
import { useAppSelector } from "@/redux/app/hooks";
import { motion } from "framer-motion";
import useUser from "@/hooks/useUser";

import ChatListItem from "./ChatListItem";
import { ChatListItemMenu } from "@/components/ui/Menus/ChatListItemMenu";
import SkeletonChatListItem from "./SkeletonChatListItem";

import { IChat } from "@/types/chat";
import { useState, useCallback } from "react";
import { cn } from "@/utils";
import { useRouter } from "next/navigation";

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
  const user = useUser();
  const searchInputValue = useAppSelector(
    (store) => store.search.searchInput.value
  );
  const [deletingChat, setDeletingChat] = useState("");
  const { push } = useRouter();

  const getChatHandler = useCallback(
    (chat: IChat) =>
      chat.chatType === "none"
        ? async () => {
            await createNewChat(chat);
            push("/c/" + chat.id);
          }
        : () => setActiveChat(chat.id),
    [createNewChat, push, setActiveChat]
  );

  const renderSkeletons = useCallback(
    () =>
      Array.from({ length: 9 }).map((_, index) => (
        <SkeletonChatListItem key={index} />
      )),
    []
  );

  const renderChatItem = useCallback(
    (chat: IChat, index: number) => {
      const isChatPinned = user && chat.isPin.includes(user.uid);
      const isActive = chat.id === activeChat;
      const setChatHandler = getChatHandler(chat);
      const isDeleting = deletingChat === chat.id;

      const listItemClasses = cn(
        "transition-all duration-300",
        isDeleting && "-translate-x-full"
      );

      const motionListItemProps = {
        initial: { x: 0 },
        animate: {
          x: isDeleting ? "-100%" : 0,
          maxHeight: isDeleting ? 0 : "4rem",
        },
        exit: { x: "-100%", maxHeight: 0 },
        transition: {
          duration: 0.3,
          ease: "easeOut",
          maxHeight: {
            duration: 0.3,
            delay: isDeleting ? 0.3 : 0,
          },
        },
      };

      return searchInputValue === "" ? (
        <ChatListItemMenu onDelete={setDeletingChat} data={chat} key={chat.id}>
          {isChatPinned ? (
            <Draggable key={chat.id} draggableId={chat.id} index={index}>
              {(provided) => (
                <li
                  className={listItemClasses}
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
              className="max-h-16 overflow-hidden"
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
      ) : (
        <li key={chat.id}>
          <ChatListItem
            {...chat}
            index={index}
            isActive={isActive}
            setChat={setChatHandler}
          />
        </li>
      );
    },
    [activeChat, deletingChat, getChatHandler, searchInputValue, user]
  );

  return (
    <Droppable droppableId="chatListDroppable">
      {(provided) => (
        <ul
          className="list flex flex-col"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {chats && !loading ? chats.map(renderChatItem) : renderSkeletons()}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};

export default ChatListItems;
