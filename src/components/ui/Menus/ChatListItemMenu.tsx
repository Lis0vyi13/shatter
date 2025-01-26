import { ReactNode, useCallback, useMemo } from "react";

import useUser from "@/hooks/useUser";
import { useChatActions } from "./useChatActions";
import useActions from "@/hooks/useActions";
import useChats from "@/hooks/useChats";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "../shadcn/context-menu";

import { FaRegFolderOpen } from "react-icons/fa";
import { TiPin } from "react-icons/ti";
import { RiInboxUnarchiveLine } from "react-icons/ri";
import { MdOutlineCleaningServices, MdDeleteOutline } from "react-icons/md";

import { IChat } from "@/types/chat";

interface IChatListItemMenu {
  data: IChat;
  children: ReactNode;
  onDelete: (chatId: string) => void;
}

export function ChatListItemMenu({
  data,
  onDelete,
  children,
}: IChatListItemMenu) {
  const labelWithIconClassName =
    "absolute left-[2rem] top-1/2 -translate-y-1/2";
  const user = useUser();
  const chats = useChats();
  const { setChats, setUser, setActiveChat } = useActions();
  const { openChat, doTogglePinChat, doDeleteChat } = useChatActions();

  const handlePinToggle = useCallback(
    async (chatId: string) => {
      if (!user || !chats) return;
      const updatedChats = chats.map((chat) => {
        if (chat.id === chatId) {
          const isPinned = chat.isPin.includes(user.uid);

          const updatedIsPin = isPinned
            ? chat.isPin.filter((pinnedUid) => pinnedUid !== user.uid)
            : [...chat.isPin, user.uid];

          return { ...chat, isPin: updatedIsPin };
        }
        return chat;
      });

      const { pinnedChats, regularChats } = updatedChats.reduce(
        (acc, chat) => {
          if (chat.isPin.includes(user?.uid)) {
            acc.pinnedChats.push(chat);
          } else {
            acc.regularChats.push(chat);
          }
          return acc;
        },
        { pinnedChats: [] as IChat[], regularChats: [] as IChat[] }
      );

      pinnedChats.sort((a, b) => b.updatedAt - a.updatedAt);
      regularChats.sort((a, b) => b.updatedAt - a.updatedAt);

      const sortedChats = [...pinnedChats, ...regularChats];

      setChats(sortedChats);

      await doTogglePinChat(
        user.uid,
        chatId,
        chatId === user.favorites ? "favorites" : "chats"
      );
    },
    [chats, doTogglePinChat, setChats, user]
  );

  const menuItems = useMemo(
    () => [
      {
        icon: <FaRegFolderOpen className="text-[15px]" />,
        label: "Open",
        separator: true,
        action: () => openChat(data.id),
      },
      {
        icon: <TiPin className="text-[16px]" />,
        label: user && data.isPin.includes(user.uid) ? "Unpin" : "Pin",
        separator: false,
        action: async () => {
          if (user && chats) {
            await handlePinToggle(data.id);
          }
        },
      },
      {
        icon: <RiInboxUnarchiveLine className="text-[16px]" />,
        label: "Archive",
        separator: true,
        action: () => {},
      },
      {
        icon: <MdOutlineCleaningServices className="text-[16px]" />,
        label: "Clear history",
        separator: false,
        action: () => {},
      },
      {
        icon: <MdDeleteOutline className="text-[16px] text-[#ee242b]" />,
        label: "Delete chat",
        isDanger: true,
        separator: false,
        action: () => {
          try {
            if (user) {
              onDelete(data.id);
              setActiveChat("");
              const updatedChats = user.chats?.filter((id) => id != data.id);
              const updatedUser = { ...user, chats: updatedChats };
              setTimeout(async () => {
                setUser(updatedUser);
                await doDeleteChat(user?.uid, data.id);
              }, 400);
            }
          } catch (error) {
            console.log(error);
          } finally {
            window.history.replaceState(null, "", "/c");
          }
        },
      },
    ],
    [
      chats,
      data.id,
      data.isPin,
      doDeleteChat,
      handlePinToggle,
      onDelete,
      openChat,
      setUser,
      user,
    ]
  );

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-56 border-none">
        {menuItems.map((item, index) => (
          <div key={index}>
            <ContextMenuItem onClick={item.action}>
              <div className="flex items-center">
                {item.icon}
                <p
                  className={`${labelWithIconClassName} ${
                    item.isDanger ? "text-[#ee242b]" : ""
                  }`}
                >
                  {item.label}
                </p>
              </div>
            </ContextMenuItem>
            {item.separator && <ContextMenuSeparator />}
          </div>
        ))}
      </ContextMenuContent>
    </ContextMenu>
  );
}
