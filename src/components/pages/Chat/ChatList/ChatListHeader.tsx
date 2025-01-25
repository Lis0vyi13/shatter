import SearchUserDialog from "@/components/ui/Dialogs/SearchUserDialog";
import Title from "@/components/ui/Title";

import { IChat } from "@/types/chat";

interface IChatListHeader {
  data: IChat[] | null;
  func: {
    handleCreateNewChat: (chatData: IChat) => Promise<void>;
    handleSetActiveChat: (id: string) => void;
  };
  className?: string;
}

const ChatListHeader = ({ data, func, className }: IChatListHeader) => {
  const dialogProps = {
    data,
    handleCreateNewChat: func.handleCreateNewChat,
    handleSetActiveChat: func.handleSetActiveChat,
  };
  return (
    <header className={className}>
      <div className="flex items-center justify-between tracking-tight">
        <Title className="font-bold text-[18px]">Messages</Title>
        <SearchUserDialog className="w-8 h-8" {...dialogProps} />
      </div>
    </header>
  );
};

export default ChatListHeader;
