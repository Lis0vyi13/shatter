import { cn } from "@/utils";

import EmptyChat from "./EmptyChat";
import Message from "./Message";
import MessageSkeleton from "./skeletons/Message.skeleton";

import { IChat } from "@/types/chat";
import { IUser } from "@/types/user";

const ChatMain = ({
  data,
  user,
}: {
  data: IChat | null;
  user: IUser | null;
}) => {
  return (
    <main
      className={cn(
        "chat-main custom-scrollbar chat-scrollbar overflow-x-hidden flex flex-col gap-3 flex-1",
        data ? "overflow-y-auto" : "overflow-y-hidden",
      )}
    >
      {data ? (
        data.messages.length > 0 ? (
          data.messages.map((m) => {
            return (
              <Message
                participantTitle={user && user.uid ? data.title[user?.uid] : ""}
                participantAvatar={data.avatar}
                key={m.id}
                data={m}
              />
            );
          })
        ) : (
          <div className="-mt-6 h-full flex">
            <EmptyChat />
          </div>
        )
      ) : (
        <>
          {Array.from({ length: 6 }).map((_, index) => (
            <MessageSkeleton key={index} isOwnMessage={index % 2 === 1} />
          ))}
        </>
      )}
    </main>
  );
};
export default ChatMain;
