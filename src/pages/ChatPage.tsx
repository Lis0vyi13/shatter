import { Helmet } from "react-helmet-async";

import ChatWrapper from "@/components/pages/Chat/ChatWrapper";
import useUserChatsListener from "@/hooks/useUserChatsListener";

const ChatPage = () => {
  useUserChatsListener();
  return (
    <>
      <Helmet>
        <title>Chat | Shatter</title>
        <meta name="description" content="Shatter chat" />
      </Helmet>

      <div className="chat-page overflow-hidden flex flex-1">
        <ChatWrapper />
      </div>
    </>
  );
};

export default ChatPage;
