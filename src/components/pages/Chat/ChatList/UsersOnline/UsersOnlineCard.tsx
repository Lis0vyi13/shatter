import { memo } from "react";

import useActiveChat from "@/hooks/useActiveChat";
import { cn, getLanguage } from "@/utils";

import Title from "@/components/ui/Title";
import Avatar from "@/components/common/Avatar";

import { IParticipantOnline } from "@/types/chat";

const UsersOnlineCard = memo(({ data }: { data: IParticipantOnline }) => {
  const activeChat = useActiveChat();
  const titleLang = getLanguage(data.title.split(" ")[0]);

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

        <Title
          lang={titleLang}
          className={
            titleLang === "ru"
              ? "text-[12px] mt-[-1px] font-[600]"
              : "text-[11px]"
          }
        >
          {data.title.split(" ")[0]}
        </Title>
      </div>
    </div>
  );
});

UsersOnlineCard.displayName = "UsersOnlineCard";
export default UsersOnlineCard;
