import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  deleteChat,
  togglePinChat,
  updateChatOrder,
  updateChatOrders,
} from "@/services/chat";
import { useAppSelector } from "@/redux/app/hooks";

import useUser from "@/hooks/useUser";
import useActions from "@/hooks/useActions";
import useChats from "@/hooks/useChats";

import { IChat } from "@/types/chat";

export const useChatActions = () => {
  const navigate = useNavigate();
  const user = useUser();
  const participantsList = useAppSelector(
    (store) => store.chat.onlineParticipants,
  );
  const { setActiveChat, setOnlineParticipants, setUser, setChats } =
    useActions();
  const chats = useChats();
  const activeChat = useAppSelector((store) => store.chat.activeChat);
  const { pathname } = useLocation();
  const isArchiveChat = pathname.includes("archive");
  const path = isArchiveChat ? "/archive" : "/c";

  const openChat = (id: string) => {
    navigate(`${path}/${id}`);
  };

  const doTogglePinChat = useCallback(
    async (chatId: string) => {
      if (!user || !chats) return;
      let chatOrderValue = null;
      let newPinnedChat = null;

      const updatedChats = chats.map((chat) => {
        if (chat.id === chatId) {
          const currentIsPin = chat.isPin ?? [];
          const isPinned = currentIsPin.includes(user.uid);
          if (isPinned) {
            chatOrderValue = chat.order?.[user.uid];
          }

          const updatedIsPin = isPinned
            ? currentIsPin.filter((pinnedUid) => pinnedUid !== user.uid)
            : [...currentIsPin, user.uid];

          return { ...chat, isPin: updatedIsPin };
        }
        return chat;
      });

      const { pinnedChats, regularChats } = updatedChats.reduce(
        (acc, chat) => {
          const isPinned = (chat.isPin ?? []).includes(user.uid);
          const updatedChat = {
            ...chat,
            order: isPinned
              ? { ...chat.order, [user.uid]: acc.pinnedChats.length + 1 }
              : chat.order,
          };

          if (isPinned) {
            if (chat.id === chatId) newPinnedChat = updatedChat;
            acc.pinnedChats.push(updatedChat);
          } else {
            acc.regularChats.push(chat);
          }

          return acc;
        },
        { pinnedChats: [] as IChat[], regularChats: [] as IChat[] },
      );

      const sortedPinnedChats = pinnedChats.sort(
        (a, b) => (a.order?.[user.uid] ?? 0) - (b.order?.[user.uid] ?? 0),
      );
      const sortedRegularChats = regularChats.sort(
        (a, b) => b.updatedAt - a.updatedAt,
      );

      const sortedChats = [...sortedPinnedChats, ...sortedRegularChats];
      setChats(sortedChats);

      const pinnedChatsToUpdate = chatOrderValue
        ? sortedPinnedChats.slice(chatOrderValue)
        : null;

      try {
        await togglePinChat(
          user.uid,
          chatId,
          chatId === user.favorites ? "favorites" : "chats",
        );
        if (pinnedChatsToUpdate) {
          await updateChatOrders(pinnedChatsToUpdate);
        } else if (newPinnedChat) {
          await updateChatOrder(newPinnedChat);
        }
        return true;
      } catch (error) {
        console.error("Error toggling pin state:", error);
        return false;
      }
    },
    [chats, setChats, user],
  );

  const doDeleteChat = async (
    chatId: string,
    members: string[],
    onDelete: (chatId: string) => void,
  ) => {
    if (user) {
      try {
        onDelete(chatId);
        if (participantsList) {
          const updatedOnlineParticipants = participantsList.filter(
            (participints) => participints.chatId != chatId,
          );
          setOnlineParticipants(updatedOnlineParticipants);
        }

        if (chatId === activeChat) setActiveChat("");

        const participantId = members.find((member) => member != user.uid);

        const currentUser = await deleteChat(user.uid, chatId);
        await deleteChat(participantId!, chatId);

        if (currentUser?.updatedUser) {
          setUser(currentUser.updatedUser);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (chatId === activeChat) window.history.replaceState(null, "", "/c");
      }
    }
  };

  // const archiveChat = async (chatId: string) => {
  //   const chatRef = ref(dbRealtime, `chats/${chatId}`);
  //   await update(chatRef, { isArchived: true });
  //   toast.success("Chat archived successfully");
  //   const snapshot = await get(chatRef);
  //   if (snapshot.exists()) {
  //     const restoredChat = snapshot.val();
  //     const prevChats = chats?.filter((chat) => chat.id !== chatId);
  //     setChats([...prevChats!, restoredChat]);
  //   }
  // };

  // const unArchiveChat = async (chatId: string) => {
  //   const chatRef = ref(dbRealtime, `chats/${chatId}`);
  //   await update(chatRef, { isArchived: false });
  //   toast.success("Chat unarchived successfully");
  //   const snapshot = await get(chatRef);
  //   if (snapshot.exists()) {
  //     const restoredChat = snapshot.val();
  //     const prevChats = chats?.filter((chat) => chat.id !== chatId);
  //     setChats([...prevChats!, restoredChat]);
  //   }
  // };

  return {
    openChat,
    doTogglePinChat,
    doDeleteChat,
  };
};
