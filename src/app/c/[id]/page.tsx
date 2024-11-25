"use client";

import { Suspense, useEffect } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";

import ChatBlock from "@/components/Chat/ChatBlock";
import Loader from "@/components/ui/Loader";

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
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    router.prefetch(pathname);
  }, [pathname, router]);

  return (
    <Suspense fallback={<Loader />}>
      <div className="chat-page overflow-hidden flex flex-1">
        <ChatBlock id={id as string} />
      </div>
    </Suspense>
  );
};

export default ChatPage;
