import { Dispatch, ReactNode, SetStateAction, useMemo } from "react";

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
  onDelete: Dispatch<SetStateAction<string>>;
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
  const { setChats, setUser } = useActions();

  const { openChat, doTogglePinChat, doDeleteChat } = useChatActions();

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
            const updatedChats: IChat[] = chats.map((chat) => {
              if (chat.id === data.id) {
                const isPinned = chat.isPin.includes(user.uid);

                const updatedIsPin = isPinned
                  ? chat.isPin.filter((pinnedUid) => pinnedUid !== user.uid)
                  : [...chat.isPin, user.uid];
                return { ...chat, isPin: updatedIsPin };
              }
              return chat;
            });
            setChats(updatedChats);

            await doTogglePinChat(
              user.uid,
              data.id,
              data.id === user.favorites ? "favorites" : "chats"
            );
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
        action: async () => {
          if (user) {
            onDelete(data.id);
            const updatedChats = user.chats?.filter((id) => id != data.id);
            const updatedUser = { ...user, chats: updatedChats };
            setTimeout(() => {
              setUser(updatedUser);
              doDeleteChat(user?.uid, data.id);
            }, 300);
          }
        },
      },
    ],
    [
      chats,
      data.id,
      data.isPin,
      doDeleteChat,
      doTogglePinChat,
      onDelete,
      openChat,
      setChats,
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
