import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { auth } from "@/firebase/firebaseConfig";

import { getChatById } from "@/services/chat";
import { getUserById } from "@/services/user";

import ChatWrapper from "@/components/pages/Chat/ChatWrapper";

import { IChat } from "@/types/chat";

const ChatRoomPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("Loading...");

  useEffect(() => {
    const fetchMetadata = async () => {
      const user = auth.currentUser;
      const chat: IChat | null = await getChatById(id as string);
      const participantId = chat?.members.filter((uid) => uid !== user?.uid)[0];
      const participant =
        chat && participantId ? await getUserById(participantId) : null;

      setTitle(participant ? participant.displayName : "Favorites");
    };

    fetchMetadata();
  }, [id]);

  return (
    <>
      <Helmet>
        <title>{title} | Shatter</title>
        <meta name="description" content="Shatter chat" />
      </Helmet>
      <div className="chat-page overflow-hidden flex flex-1">
        <ChatWrapper id={id as string} />
      </div>
    </>
  );
};

export default ChatRoomPage;
