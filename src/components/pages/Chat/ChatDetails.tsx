import { useCallback, useState } from "react";

import { cn } from "@/utils";

import Block from "@/components/ui/Block";
import Delete from "@/components/ui/Delete";
import ChatDetailsItem from "./ChatDetailsItem";

import { IChat, IChatInfo } from "@/types/chat";
import { CHAT_DETAILS } from "./Chat.constants";

interface IChatDetails {
  data: IChat | null;
}

const ChatDetails = ({ data }: IChatDetails) => {
  const [isInfoVisible, setIsInfoVisible] = useState(true);
  const [isMembersVisible, setIsMembersVisible] = useState(true);

  const toggleSetInfoVisible = useCallback(() => {
    setIsInfoVisible((prev) => !prev);
  }, []);
  const toggleSetMembersVisible = useCallback(() => {
    setIsMembersVisible((prev) => !prev);
  }, []);

  const sectionClassName = cn(
    "chat-details flex flex-col h-full gap-2",
    !isInfoVisible && !isMembersVisible ? "w-0" : "w-[300px]",
  );

  return (
    (isInfoVisible || isMembersVisible) && (
      <div className="hidden xl:block">
        <section className={sectionClassName}>
          {isInfoVisible && (
            <Block className="chat-info px-4 py-5 min-h-[54%]">
              <header>
                <h1 className="text-[22px] font-[500] capitalize">Chat Info</h1>
                <Delete
                  className="text-[22px] right-4 top-3"
                  handler={toggleSetInfoVisible}
                />
              </header>
              <main className="chat-info__content pb-8 mt-3 h-full overflow-auto">
                <h2 className="font-[500] capitalize">Files</h2>
                <div className="details flex flex-col mt-4 gap-2">
                  {data &&
                    CHAT_DETAILS.map((detail) => {
                      const info = data.info;
                      const value = info[detail.name as keyof IChatInfo];
                      return (
                        <ChatDetailsItem
                          key={detail.name}
                          detail={detail}
                          value={value}
                        />
                      );
                    })}
                </div>
              </main>
            </Block>
          )}
          {isMembersVisible && (
            <Block className="chat-members px-4 py-5">
              <h1 className="text-[18px] font-[500] capitalize">Members</h1>
              <Delete
                className="text-[22px] right-4 top-3"
                handler={toggleSetMembersVisible}
              />
            </Block>
          )}
        </section>
      </div>
    )
  );
};

export default ChatDetails;
