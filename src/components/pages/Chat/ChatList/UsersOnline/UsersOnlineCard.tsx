import useActiveChat from "@/hooks/useActiveChat";
import { cn } from "@/utils";
import { IChatParticipantsCard } from "./hooks/useUsersOnlineList";

import Title from "@/components/ui/Title";
import Avatar from "@/components/common/Avatar";

const UsersOnlineCard = ({ data }: { data: IChatParticipantsCard }) => {
  const activeChat = useActiveChat();

  return (
    <div
      className={cn(
        "relative w-14 overflow-x-auto rounded-xl transition-all bg-transparent duration-300 select-none",
        activeChat === data.chatId
          ? "bg-lightBlue"
          : "hover:bg-dark hover:bg-opacity-20",
      )}
    >
      <div className="flex flex-col overflow-hidden text-center p-1 gap-[6px]">
        <div className="relative mx-auto">
          <Avatar
            className="w-12 h-12 pointer-events-none"
            src={data.avatar}
            title={data.title}
          />
          <div className="absolute bottom-[-2px] right-[-1px] w-3 h-3 bg-[green] rounded-full border-2 border-white" />
        </div>

        <Title className="text-[11px]">{data.title.split(" ")[0]}</Title>
      </div>
    </div>
  );
};

export default UsersOnlineCard;
