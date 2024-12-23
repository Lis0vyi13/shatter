"use client";

import { Droppable, Draggable } from "@hello-pangea/dnd";

import ChatListItem from "./ChatListItem";
import Loader from "@/components/ui/Loader";
import { ChatListItemMenu } from "@/components/ui/Menus/ChatListItemMenu";

import { IChat } from "@/types/chat";
import useUser from "@/hooks/useUser";

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
  return (
    <Droppable droppableId="chatListDroppable">
      {(provided) => (
        <ul
          className="list flex flex-col"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {chats ? (
            chats.map((chat, index) => (
              <ChatListItemMenu data={chat} key={chat.id}>
                {user && chat.isPin.includes(user.uid) ? (
                  <Draggable key={chat.id} draggableId={chat.id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <ChatListItem
                          {...chat}
                          index={index}
                          isActive={chat.id == activeChat}
                          setChat={
                            chat.chatType === "none"
                              ? () => createNewChat(chat)
                              : () => setActiveChat(chat.id)
                          }
                        />
                      </li>
                    )}
                  </Draggable>
                ) : (
                  <li key={chat.id}>
                    <ChatListItem
                      {...chat}
                      index={index}
                      isActive={chat.id == activeChat}
                      setChat={
                        chat.chatType === "none"
                          ? () => createNewChat(chat)
                          : () => setActiveChat(chat.id)
                      }
                    />
                  </li>
                )}
              </ChatListItemMenu>
            ))
          ) : (
            <Loader isDefault />
          )}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};

export default ChatListItems;
