import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { dbRealtime } from "@/firebase/firebaseConfig";
import useUser from "@/hooks/useUser";
import { getUserStatus } from "@/services/user";

import UsersOnlineCard from "./UsersOnlineCard";

import { IChat } from "@/types/chat";
import { IUserStatus } from "@/types/user";
import { Link } from "react-router-dom";

export interface IChatParticipantsCard {
  chatId: string;
  participant: string;
  title: string;
  avatar: string;
  userStatus: IUserStatus | null;
}
const UsersOnlineList = ({ data }: { data: IChat[] | null }) => {
  const [chatParticipantsData, setChatParticipantData] = useState<
    IChatParticipantsCard[] | null
  >(null);
  const user = useUser();

  useEffect(() => {
    const chatParticipants = data?.reduce((acc, chat) => {
      if (chat.id !== user?.favorites && user) {
        const participantId = chat.members[1];
        const avatar = chat.avatar as Record<string, string>;
        acc.push({
          chatId: chat.id,
          participant: participantId,
          title: chat.title?.[user?.uid],
          avatar: avatar[user.uid],
          userStatus: null,
        });
      }
      return acc;
    }, [] as IChatParticipantsCard[]);

    const getUsersStatus = async () => {
      if (chatParticipants) {
        const statuses = (await Promise.all(
          chatParticipants.map((chat) => getUserStatus(chat.participant))
        )) as IUserStatus[];
        const updatedData = chatParticipants?.map((chat, i) => ({
          ...chat,
          userStatus: statuses[i],
        }));
        setChatParticipantData(updatedData);
      }
    };
    getUsersStatus();
  }, [data]);

  useEffect(() => {
    chatParticipantsData?.forEach((chat) => {
      const userStatusRef = ref(dbRealtime, `users/${chat.participant}/status`);

      const unsubscribe = onValue(userStatusRef, (snapshot) => {
        const status = snapshot.val();
        if (status) {
          setChatParticipantData((prevStatus) => {
            if (prevStatus) {
              return prevStatus.map((data) =>
                data.participant === chat.participant
                  ? { ...data, status }
                  : data
              );
            }
            return prevStatus;
          });
        }
      });

      return () => {
        unsubscribe();
      };
    });
  }, []);
  return (
    <section className="flex gap-1">
      {chatParticipantsData?.slice(0, 4)?.map((data) => (
        <Link key={data.chatId} to={`/c/${data.chatId}`}>
          <UsersOnlineCard key={data.chatId} data={data} />
        </Link>
      ))}
      {chatParticipantsData?.slice(4, 5)?.map((data) => (
        <UsersOnlineCard key={data.chatId} data={data} />
      ))}
    </section>
  );
};

export default UsersOnlineList;
