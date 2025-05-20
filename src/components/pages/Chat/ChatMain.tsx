import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/utils";

import EmptyChat from "./EmptyChat";
import Message from "./Message";
import MessageSkeleton from "./skeletons/Message.skeleton";

import { IChat } from "@/types/chat";
import { IUser } from "@/types/user";
import { useChat } from "@/hooks/useChat";

import { motion, AnimatePresence } from "framer-motion";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/shadcn/context-menu";
import { deleteMessage } from "@/services/chat";
import { getUserById } from "@/services/user";

const ChatMain = ({
  data,
  user,
}: {
  data: IChat | null;
  user: IUser | null;
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [participant, setParticipant] = useState<IUser | null>(null);

  const receiverId = useMemo(() => {
    if (!data?.members || !user?.uid) return "";
    const memberIds = Object.keys(data.members);
    return memberIds.find((id) => id !== user.uid) ?? "";
  }, [data?.members, user?.uid]);

  const { messages, loading } = useChat(
    user?.uid ?? "",
    receiverId,
    data?.id ?? "",
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const getUser = async () => {
      const participant = await getUserById(receiverId!);
      if (!participant) return;
      setParticipant(participant);
    };
    getUser();
  }, [receiverId]);

  const handleDeleteMessage = async (messageId: string) => {
    if (!data) return;

    await deleteMessage(data.id, messageId);
  };
  return (
    <main
      className={cn(
        "chat-main custom-scrollbar chat-scrollbar overflow-x-hidden flex flex-col gap-3 flex-1 pb-2",
        data ? "overflow-y-auto" : "overflow-y-hidden",
      )}
    >
      {data ? (
        loading ? (
          <>
            {Array.from({ length: 6 }).map((_, index) => (
              <MessageSkeleton key={index} isOwnMessage={index % 2 === 1} />
            ))}
          </>
        ) : messages.length > 0 ? (
          <AnimatePresence>
            {messages.map((m) => (
              <motion.div
                key={m.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className={m.senderId === user?.uid ? "self-end" : "self-start"}
              >
                <ContextMenu>
                  <ContextMenuTrigger>
                    <Message
                      participantTitle={user?.uid ? data.title[user.uid] : ""}
                      participantAvatar={participant?.photoUrl || ""}
                      data={m}
                    />
                  </ContextMenuTrigger>
                  <ContextMenuContent className="w-32 border-none">
                    <ContextMenuItem
                      className="text-red-500 hover:text-red-600"
                      onClick={() => handleDeleteMessage(m.id)}
                    >
                      Delete
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <div className="-mt-6 h-full flex">
            <EmptyChat />
          </div>
        )
      ) : null}
      <div ref={messagesEndRef} />
    </main>
  );
};

export default ChatMain;
