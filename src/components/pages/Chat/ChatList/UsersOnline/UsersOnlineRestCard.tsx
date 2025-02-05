import Avatar from "@/components/common/Avatar";
import Title from "@/components/ui/Title";
import { IChatParticipantsCard } from "./hooks/useUsersOnlineList";

const UsersOnlineRestCard = ({ data }: { data: IChatParticipantsCard[] }) => {
  const [firstUser, secondUser, thirdUser] = data;
  const remainingCount = data.slice(3).length;

  return (
    <div className="relative w-14 h-19 flex-1 bg-[#1a0d46] self-start mt-[2px] rounded-xl transition-all duration-300">
      <div className="flex flex-col overflow-hidden text-center pt-1 pb-[6px] px-1 gap-[6px]">
        <div className="relative mx-auto">
          <div className="flex relative items-center justify-center w-12 h-12 rounded-xl overflow-hidden">
            <div className="absolute mt-[2px] z-[2] left-1 w-7 h-7">
              <Avatar
                className="text-[13px]"
                src={firstUser.avatar}
                title={firstUser.title}
              />
            </div>
            <div className="absolute z-[1] top-[2px] right-1 w-[22px] h-[22px]">
              <Avatar
                className="text-[13px]"
                src={secondUser.avatar}
                title={secondUser.title}
              />
            </div>
            {thirdUser && (
              <div className="absolute z-[3] bottom-[2px] right-1 w-[22px] h-[22px]">
                <Avatar
                  className="text-[13px]"
                  src={thirdUser.avatar}
                  title={thirdUser.title}
                />
              </div>
            )}
          </div>

          <Title className="text-white text-[10px] leading-tight text-center">
            {remainingCount > 0 ? `+${remainingCount}` : `${data.length} users`}
          </Title>
        </div>
      </div>
    </div>
  );
};

export default UsersOnlineRestCard;
