import { memo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppSelector } from "@/redux/app/hooks";

import { cn } from "@/utils";
import useUser from "@/hooks/useUser";

import ChatListItemContent from "./ChatListItemContent";

import { IChat } from "@/types/chat";

interface IChatListItemProps extends IChat {
  isActive: boolean;
  setChat: () => Promise<void> | void;
  index: number;
}

const ChatListItem = memo((props: IChatListItemProps) => {
  const { isActive, setChat, index, ...chat } = props;

  const user = useUser();
  const isFavorite = chat.id === user?.favorites;
  const isUserChatMember = user?.chats.includes(chat.id) || isFavorite;
  const searchInputDebouncedValue = useAppSelector(
    (store) => store.search.searchInput.debouncedValue
  );
  const animatePosition = searchInputDebouncedValue !== "" ? "-100%" : 0;

  const chatItemContentProps = { user, chat, isUserChatMember };

  const itemClassName = cn(
    `chat-list-item cursor-pointer flex gap-2 p-2 rounded-xl w-full transition-colors`,
    isActive ? "bg-lightBlue" : "bg-white hover:bg-blue hover:bg-opacity-15"
  );
  return (
    <motion.div
      initial={{ x: animatePosition }}
      animate={{ x: 0 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 40,
        delay: 0.05 * index,
      }}
    >
      {isUserChatMember ? (
        <Link to={`/c/${chat.id}`} onClick={setChat} className={itemClassName}>
          <ChatListItemContent {...chatItemContentProps} />
        </Link>
      ) : (
        <div className={cn(itemClassName, "cursor-pointer")} onClick={setChat}>
          <ChatListItemContent {...chatItemContentProps} />
        </div>
      )}
    </motion.div>
  );
});

ChatListItem.displayName = "ChatListItem";

export default ChatListItem;
