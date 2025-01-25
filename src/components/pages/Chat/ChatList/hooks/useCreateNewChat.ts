import useActions from "@/hooks/useActions";
import useUser from "@/hooks/useUser";
import { createChat } from "@/services/chat";
import { addChatToUser } from "@/services/chat";

import { IChat } from "@/types/chat";

export const useCreateNewChat = () => {
  const user = useUser();
  const { setUser } = useActions();
  const createNewChat = async (chatData: IChat) => {
    try {
      const uid = user?.uid;

      if (!uid) {
        console.error("User ID is missing, unable to create chat.");
        return;
      }

      const data: IChat = { ...chatData, chatType: "individual" };

      const updatedUser = {
        ...user,
        chats: [...user.chats, chatData.id],
      };
      setUser(updatedUser);

      const chat = await createChat(data);

      if (chat.success && chat.data?.id) {
        await addChatToUser(uid, chat.data.id);
      } else {
        console.error("Failed to create chat:", chat.error);
      }
    } catch (error) {
      console.error("Error creating or updating chat:", error);
    }
  };

  return createNewChat;
};
