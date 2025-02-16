import { useEffect, useState } from "react";
import { getUserById, getUserStatus } from "@/services/user";

import useUser from "@/hooks/useUser";
import useActions from "@/hooks/useActions";

import { IUserStatus } from "@/types/user";
import { IChat, IParticipantOnline } from "@/types/chat";

const useUsersOnline = (data: IChat[] | null) => {
  const [chatParticipantsData, setChatParticipantData] = useState<
    IParticipantOnline[] | null
  >(null);
  const { setOnlineParticipants: setReduxOnlineParticipants } = useActions();
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
        setReduxOnlineParticipants(updatedData);
      };

      getUsersStatus();
    };

    fetchChatParticipants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return [chatParticipantsData, setChatParticipantData] as const;
};

export default useUsersOnline;
