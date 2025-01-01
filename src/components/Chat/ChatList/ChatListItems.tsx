"use client";

import { useState, useCallback, useMemo } from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { useAppSelector } from "@/redux/app/hooks";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import useUser from "@/hooks/useUser";
import { cn } from "@/utils";

import ChatListItem from "./ChatListItem";
import { ChatListItemMenu } from "@/components/ui/Menus/ChatListItemMenu";
import SkeletonChatListItem from "./SkeletonChatListItem";

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
  const user = useUser();
  const searchInputValue = useAppSelector(
    (store) => store.search.searchInput.value
  );
  const [deletingChat, setDeletingChat] = useState("");
  const { push } = useRouter();

  const { pinnedChats, unpinnedChats } = useMemo(() => {
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
    (chat: IChat, index: number, isChatPinned: boolean) => {
      const isActive = chat.id === activeChat;
      const setChatHandler = getChatHandler(chat);
      const isDeleting = deletingChat === chat.id;

      const listItemClasses = cn(
        "transition-none ",
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

      if (searchInputValue !== "") {
        return (
          <li key={chat.id}>
            <ChatListItem
              {...chat}
              index={index}
              isActive={isActive}
              setChat={setChatHandler}
            />
          </li>
        );
      }
      return (
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
    },
    [activeChat, deletingChat, getChatHandler, searchInputValue]
  );

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
                renderChatItem(chat, index, true)
              )}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      )}

      <ul className="list flex flex-col">
        {unpinnedChats.map((chat, index) => renderChatItem(chat, index, false))}
      </ul>
    </div>
  );
};

export default ChatListItems;
