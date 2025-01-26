import { cn } from "@/utils";

import Message from "./Message";
import MessageSkeleton from "./skeletons/Message.skeleton";

import { IChat, IMessage } from "@/types/chat";
import { IUser } from "@/types/user";

const ChatMain = ({
  messages,
  data,
  user,
}: {
  messages: IMessage[];
  data: IChat | null;
  user: IUser | null;
}) => {
  return (
    <main
      className={cn(
        "chat-main custom-scrollbar chat-scrollbar overflow-x-hidden flex flex-col gap-3 flex-1",
        data ? "overflow-y-auto" : "overflow-y-hidden"
      )}
    >
      {data ? (
        messages.map((m) => (
          <Message
            collocutorTitle={user && user.uid ? data.title[user?.uid] : ""}
            collocutorAvatar={data.avatar}
            key={m.id}
            data={m}
          />
        ))
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
