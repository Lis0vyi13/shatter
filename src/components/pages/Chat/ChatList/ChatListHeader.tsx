import useUsersOnline from "./UsersOnline/hooks/useUsersOnline";

import SearchUserDialog from "@/components/ui/Dialogs/SearchUserDialog";
import Title from "@/components/ui/Title";
import UsersOnlineList from "./UsersOnline/UsersOnlineList";

import { IChat } from "@/types/chat";

interface IChatListHeader {
  data: IChat[] | null;
  func: {
    handleCreateNewChat: (chatData: IChat) => Promise<void>;
    handleSetActiveChat: (id: string) => void;
  };
  className?: string;
  listRef: React.MutableRefObject<HTMLDivElement | null>;
}

const ChatListHeader = ({
  data,
  listRef,
  func,
  className,
}: IChatListHeader) => {
  const [usersOnline, setUsersOnline] = useUsersOnline(data);

  const dialogProps = {
    data,
    listRef,
    handleCreateNewChat: func.handleCreateNewChat,
    handleSetActiveChat: func.handleSetActiveChat,
  };

  return (
    <header className={className}>
      <div className="flex items-center justify-between tracking-tight">
        <Title className="font-bold text-[18px]">Messages</Title>
        <SearchUserDialog className="w-8 h-8" {...dialogProps} />
      </div>

      {usersOnline?.length != 0 && (
        <div className="mt-3 overflow-hidden">
          <UsersOnlineList
            setParticipants={setUsersOnline}
            data={usersOnline}
          />
        </div>
      )}
    </header>
  );
};

export default ChatListHeader;
