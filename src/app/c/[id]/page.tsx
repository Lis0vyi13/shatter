"use client";

import { useParams } from "next/navigation";

import ChatBlock from "@/components/Chat/ChatBlock";

// export async function generateMetadata({
//   params,
//   searchParams,
// }: IChatPage): Promise<Metadata> {
//   const uid = (await searchParams).uid;
//   const chatId = (await params).id;
//   const chat: IChat | null = await getChatById(uid, chatId);
//   const user = chat ? await getUserById(chat.members[0]) : null;

//   return {
//     title: uid === user?.uid ? "Favorites" : user?.displayName,
//   };
// }

const ChatPage = () => {
  const { id } = useParams();

  return (
    <div className="chat-page overflow-hidden flex flex-1">
      <ChatBlock id={id as string} />
    </div>
  );
};

export default ChatPage;
