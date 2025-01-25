import Message from "./Message";

import { IChat, IMessage } from "@/types/chat";
import { IUser } from "@/types/user";

const ChatMain = ({
  messages,
  data,
  user,
}: {
  messages: IMessage[];
  data: IChat;
  user: IUser | null;
}) => (
  <main className="chat-main overflow-y-auto overflow-x-hidden flex flex-col gap-3 flex-1">
    {messages.map((m) => (
      <Message
        collocutorTitle={user && user.uid ? data.title[user?.uid] : ""}
        collocutorAvatar={data.avatar}
        key={m.id}
        data={m}
      />
    ))}
  </main>
);

export default ChatMain;
