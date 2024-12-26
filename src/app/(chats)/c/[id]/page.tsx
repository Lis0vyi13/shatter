import { Metadata } from "next";
import { auth } from "@/firebase/firebaseConfig";

import { getUserById } from "@/services/user";
import { getChatById } from "@/services/chat";

import Chat from "./Chat";

import { IChat } from "@/types/chat";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const chatId = (await params).id;
  const user = auth.currentUser;
  const chat: IChat | null = await getChatById(chatId);
  const collocutorId = chat?.members.filter((uid) => uid != user?.uid)[0];
  const collocutor =
    chat && collocutorId ? await getUserById(collocutorId) : null;

  return {
    title: collocutor ? collocutor?.displayName : "Favorites",
  };
}

const ChatPage = () => {
  return <Chat />;
};

export default ChatPage;
