import React from "react";

import SearchUserDialog from "@/components/ui/Dialogs/SearchUserDialog";
import Title from "@/components/ui/Title";
import { IChat } from "@/types/chat";
import { cn } from "@/utils";

interface IChatListHeader {
  data: IChat[] | null;
  func: {
    createNewChat: (chatData: IChat) => Promise<void>;
    setActiveChat: (id: string) => Promise<void>;
  };
  className?: string;
}

const ChatListHeader = ({ data, func, className }: IChatListHeader) => {
  const dialogProps = {
    data,
    createChat: func.createNewChat,
    setActiveChat: func.setActiveChat,
  };
  return (
    <header className={cn("", className)}>
      <div className="flex items-center justify-between tracking-tight">
        <Title className="font-bold text-[18px]">Messages</Title>
        <SearchUserDialog className="w-8 h-8" {...dialogProps} />
      </div>
    </header>
  );
};

export default ChatListHeader;
