import ChatBlock from "@/components/Chat/ChatBlock";
import { getChatById, getUserById } from "@/services/firebase";
import { IChat } from "@/types/chat";
import { Metadata } from "next";

interface IChatPage {
  params: { id: string };
  searchParams: { uid: string };
}

export async function generateMetadata({
  params,
  searchParams,
}: IChatPage): Promise<Metadata> {
  const uid = (await searchParams).uid;
  const chatId = (await params).id;
  const chat: IChat | null = await getChatById(uid, chatId);
  const user = chat ? await getUserById(chat.members[0]) : null;

  return {
    title: uid === user?.uid ? "Favorites" : user?.displayName,
  };
}

const ChatPage = async ({ params }: IChatPage) => {
  const id = (await params).id;

  return (
    <div className="chat-page overflow-hidden flex flex-1">
      <ChatBlock id={id} />
    </div>
  );
};

export default ChatPage;
