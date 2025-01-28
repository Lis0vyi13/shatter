import { ReactNode, useMemo } from "react";

import useUser from "@/hooks/useUser";
import { useChatActions } from "./useChatActions";
import useActions from "@/hooks/useActions";

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
  const { setUser } = useActions();
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
          await doTogglePinChat(data.id);
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
          await doDeleteChat(data.id, onDelete);
        },
      },
    ],
    [data.id, data.isPin, doDeleteChat, onDelete, openChat, setUser, user]
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
