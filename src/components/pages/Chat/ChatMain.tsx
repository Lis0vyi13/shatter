import { useEffect, useRef } from "react";
import { cn } from "@/utils";

import EmptyChat from "./EmptyChat";
import Message from "./Message";
import MessageSkeleton from "./skeletons/Message.skeleton";

import { IChat } from "@/types/chat";
import { IUser } from "@/types/user";
import useChat from "@/hooks/useChat";

const ChatMain = ({
  data,
  user,
}: {
  data: IChat | null;
  user: IUser | null;
}) => {
  const messages = useChat(user?.uid ?? "", data?.members[1] ?? "");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <main
      className={cn(
        "chat-main custom-scrollbar chat-scrollbar overflow-x-hidden flex flex-col gap-3 flex-1 pb-2",
        data ? "overflow-y-auto" : "overflow-y-hidden",
      )}
    >
      {messages && data ? (
        messages.length > 0 ? (
          messages.map((m) => {
            return (
              <Message
                participantTitle={user && user.uid ? data.title[user?.uid] : ""}
                participantAvatar={data?.avatar}
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
      <div ref={messagesEndRef} />
    </main>
  );
};
export default ChatMain;
