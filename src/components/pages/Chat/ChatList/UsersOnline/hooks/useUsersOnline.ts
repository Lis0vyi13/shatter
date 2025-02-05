import { useEffect, useState } from "react";
import useUser from "@/hooks/useUser";
import { getUserById, getUserStatus } from "@/services/user";

import { IChatParticipantsCard } from "./useUsersOnlineList";

import { IUserStatus } from "@/types/user";
import { IChat } from "@/types/chat";

const useUsersOnline = (data: IChat[] | null) => {
  const [chatParticipantsData, setChatParticipantData] = useState<
    IChatParticipantsCard[] | null
  >(null);
  const user = useUser();

  useEffect(() => {
    const fetchChatParticipants = async () => {
      if (!data || !user) return;

      const chatParticipants = await Promise.all(
        data
          .filter((chat) => chat.id !== user?.favorites)
          .map(async (chat) => {
            const participantId = chat.members[1];
            const participant = await getUserById(participantId);

            return {
              chatId: chat.id,
              participant: participantId,
              title: chat.title?.[user?.uid],
              avatar: participant?.photoUrl as string,
              userStatus: null,
            };
          }),
      );

      setChatParticipantData(chatParticipants);

      const getUsersStatus = async () => {
        const statuses = (await Promise.all(
          chatParticipants.map((chat) => getUserStatus(chat.participant)),
        )) as IUserStatus[];

        const updatedData = chatParticipants.map((chat, i) => ({
          ...chat,
          userStatus: statuses[i],
        }));

        setChatParticipantData(updatedData);
      };

      getUsersStatus();
    };

    fetchChatParticipants();
  }, [data, user]);

  return [chatParticipantsData, setChatParticipantData] as const;
};

export default useUsersOnline;
