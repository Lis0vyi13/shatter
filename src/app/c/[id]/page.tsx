"use client";

import { useParams } from "next/navigation";

import dynamic from "next/dynamic";
import { useEffect } from "react";

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

const ChatBlock = dynamic(() => import("@/components/Chat/ChatBlock"), {
  ssr: false,
});

const ChatPage = () => {
  const { id } = useParams();

  useEffect(() => {
    console.log("chat");
  }, []);

  return (
    <div className="chat-page overflow-hidden flex flex-1">
      <ChatBlock id={id as string} />
    </div>
  );
};

export default ChatPage;
