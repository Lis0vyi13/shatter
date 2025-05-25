import { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";

import useActiveChat from "@/hooks/useActiveChat";
import { cn, getLanguage } from "@/utils";

import Title from "@/components/ui/Title";
import Avatar from "@/components/common/Avatar";

import { IParticipantOnline } from "@/types/chat";
import { IUser } from "@/types/user";
import { getUserById } from "@/services/user";

const UsersOnlineCard = memo(({ data }: { data: IParticipantOnline }) => {
  const activeChat = useActiveChat();
  const titleLang = getLanguage(data.title.split(" ")[0]);
  const [participant, setParticipant] = useState<IUser | null>(null);

  useEffect(() => {
    const getParticipant = async () => {
      if (!data) return;
      const prt = await getUserById(data.participant);
      setParticipant(prt);
    };
    getParticipant();
  }, [data, data.participant]);

  return (
    <motion.div
      exit={{ y: 100 }}
      transition={{ duration: 0.3 }}
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
          {participant?.displayName}
        </Title>
      </div>
    </motion.div>
  );
});

UsersOnlineCard.displayName = "UsersOnlineCard";
export default UsersOnlineCard;
