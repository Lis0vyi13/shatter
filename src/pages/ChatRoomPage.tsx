import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auth } from "@/firebase/firebaseConfig";

import { getChatById } from "@/services/chat";
import { getUserById } from "@/services/user";

import ChatBlock from "@/components/pages/Chat/ChatBlock";

import { IChat } from "@/types/chat";

const ChatRoomPage = () => {
  const { id } = useParams();
  const [_, setTitle] = useState("Loading...");

  useEffect(() => {
    const fetchMetadata = async () => {
      const user = auth.currentUser;
      const chat: IChat | null = await getChatById(id as string);
      const collocutorId = chat?.members.filter((uid) => uid !== user?.uid)[0];
      const collocutor =
        chat && collocutorId ? await getUserById(collocutorId) : null;

      setTitle(collocutor ? collocutor.displayName : "Favorites");
    };

    fetchMetadata();
  }, []);

  return (
    <>
      <div className="chat-page overflow-hidden flex flex-1">
        <ChatBlock id={id as string} />
      </div>
    </>
  );
};

export default ChatRoomPage;
