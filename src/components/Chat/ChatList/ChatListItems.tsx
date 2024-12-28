import { Droppable, Draggable } from "@hello-pangea/dnd";
import { useAppSelector } from "@/redux/app/hooks";
import { motion } from "framer-motion";
import useUser from "@/hooks/useUser";

import ChatListItem from "./ChatListItem";
import { ChatListItemMenu } from "@/components/ui/Menus/ChatListItemMenu";
import SkeletonChatListItem from "./SkeletonChatListItem";

import { IChat } from "@/types/chat";
import { useState } from "react";
import { cn } from "@/utils";

interface ChatListItemsProps {
  chats: IChat[] | null;
  activeChat: string | undefined;
  setActiveChat: (id: string) => void;
  createNewChat: (chatData: IChat) => void;
}

const ChatListItems = ({
  chats,
  activeChat,
  setActiveChat,
  createNewChat,
}: ChatListItemsProps) => {
  const user = useUser();
  const searchInputValue = useAppSelector(
    (store) => store.search.searchInput.value
  );
  const [deletingChat, setDeletingChat] = useState("");

  return (
    <Droppable droppableId="chatListDroppable">
      {(provided) => (
        <ul
          className="list flex flex-col"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {chats ? (
            chats.map((chat, index) => {
              const isChatPinned = user && chat.isPin.includes(user.uid);
              const isActive = chat.id === activeChat;
              const setChatHandler =
                chat.chatType === "none"
                  ? () => createNewChat(chat)
                  : () => setActiveChat(chat.id);

              return searchInputValue === "" ? (
                <ChatListItemMenu
                  onDelete={setDeletingChat}
                  data={chat}
                  key={chat.id}
                >
                  {isChatPinned ? (
                    <Draggable
                      key={chat.id}
                      draggableId={chat.id}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          className={cn(
                            "transition-all duration-300",
                            deletingChat === chat.id && "-translate-x-full"
                          )}
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
                      initial={{ x: 0 }}
                      animate={{
                        x: deletingChat === chat.id ? "-100%" : 0,
                        maxHeight: deletingChat === chat.id ? 0 : "4rem",
                      }}
                      exit={{
                        x: "-100%",
                        maxHeight: 0,
                      }}
                      transition={{
                        duration: 0.3,
                        ease: "easeOut",
                        maxHeight: {
                          duration: 0.3,
                          delay: deletingChat === chat.id ? 0.3 : 0,
                        },
                      }}
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
            })
          ) : (
            <>
              <SkeletonChatListItem />
              <SkeletonChatListItem />
              <SkeletonChatListItem />
              <SkeletonChatListItem />
              <SkeletonChatListItem />
              <SkeletonChatListItem />
              <SkeletonChatListItem />
              <SkeletonChatListItem />
              <SkeletonChatListItem />
            </>
          )}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};

export default ChatListItems;
