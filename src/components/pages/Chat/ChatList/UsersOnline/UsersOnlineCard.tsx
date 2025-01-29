import { useMemo } from "react";

import Title from "@/components/ui/Title";
import { IChatParticipantsCard } from "./UsersOnlineList";

import { USERS_ONLINE_BACKGROUND_COLORS } from "./UsersOnline.constants";
import Avatar from "@/components/common/Avatar";

const UsersOnlineCard = ({ data }: { data: IChatParticipantsCard }) => {
  const backgroundColor = useMemo(
    () =>
      USERS_ONLINE_BACKGROUND_COLORS[
        Math.floor(Math.random() * USERS_ONLINE_BACKGROUND_COLORS.length)
      ],
    []
  );

  return (
    <div
      className="relative w-14 rounded-xl"
      style={{
        backgroundColor,
      }}
    >
      <div className="absolute top-[-2px] -right-1 w-3 h-3 bg-[green] rounded-full border-2 border-white" />

      <div className="flex flex-col overflow-hidden text-center pt-1 pb-[6px] px-1 gap-[6px]">
        <div className="mx-auto">
          <Avatar className="w-12 h-12" src={data.avatar} title={data.title} />
        </div>

        <Title className="text-[11px]">{data.title.split(" ")[0]}</Title>
      </div>
    </div>
  );
};

export default UsersOnlineCard;
