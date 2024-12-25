import { Droppable, Draggable } from "@hello-pangea/dnd";
import { useAppSelector } from "@/redux/app/hooks";

import useUser from "@/hooks/useUser";

import ChatListItem from "./ChatListItem";
import Loader from "@/components/ui/Loader";
import { ChatListItemMenu } from "@/components/ui/Menus/ChatListItemMenu";

import { IChat } from "@/types/chat";

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
                <ChatListItemMenu data={chat} key={chat.id}>
                  {isChatPinned ? (
                    <Draggable
                      key={chat.id}
                      draggableId={chat.id}
                      index={index}
                    >
                      {(provided) => (
                        <li
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
                    <li key={chat.id}>
                      <ChatListItem
                        {...chat}
                        index={index}
                        isActive={isActive}
                        setChat={setChatHandler}
                      />
                    </li>
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
            <Loader isDefault />
          )}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};

export default ChatListItems;
