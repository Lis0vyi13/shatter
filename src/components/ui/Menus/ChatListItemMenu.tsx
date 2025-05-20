import { ReactNode, useMemo } from "react";

import useUser from "@/hooks/useUser";
import { useChatActions } from "./useChatActions";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "../shadcn/context-menu";

import { FaRegFolderOpen } from "react-icons/fa";
import { TiPin } from "react-icons/ti";
import { MdOutlineCleaningServices, MdDeleteOutline } from "react-icons/md";

import { IChat } from "@/types/chat";
import { clearChatHistory } from "@/services/chat";

interface IChatListItemMenuProps {
  data: IChat;
  children: ReactNode;
  onDelete: (chatId: string) => void;
}

interface IMenuItem {
  icon: ReactNode;
  label: string;
  action: () => void;
  isDanger?: boolean;
  separator?: boolean;
}

export function ChatListItemMenu({
  data,
  onDelete,
  children,
}: IChatListItemMenuProps) {
  const user = useUser();
  const { openChat, doTogglePinChat, doDeleteChat } = useChatActions();

  const menuItems = useMemo(() => {
    const items: IMenuItem[] = [
      {
        icon: <FaRegFolderOpen className="text-[15px]" />,
        label: "Open",
        action: () => openChat(data.id),
      },
      {
        icon: <TiPin className="text-[16px]" />,
        label: user && data.isPin?.includes(user.uid) ? "Unpin" : "Pin",
        action: () => doTogglePinChat(data.id),
        separator: true,
      },
      {
        icon: <MdOutlineCleaningServices className="text-[16px]" />,
        label: "Clear history",
        action: () => clearChatHistory(data.id),
        separator: Object.keys(data.members).length !== 1,
      },
    ];

    if (Object.keys(data.members).length !== 1) {
      items.push({
        icon: <MdDeleteOutline className="text-[16px] text-[#ee242b]" />,
        label: "Delete chat",
        action: () =>
          doDeleteChat(data.id, Object.keys(data.members), onDelete),
        isDanger: true,
      });
    }

    return items;
  }, [data, user, openChat, doTogglePinChat, doDeleteChat, onDelete]);

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-56 border-none">
        {menuItems.map(
          ({ icon, label, action, separator, isDanger }, index) => (
            <div key={index}>
              <ContextMenuItem onClick={action}>
                <div className="flex items-center">
                  {icon}
                  <p
                    className={`absolute left-[2rem] top-1/2 -translate-y-1/2 ${isDanger ? "text-[#ee242b]" : ""}`}
                  >
                    {label}
                  </p>
                </div>
              </ContextMenuItem>
              {separator && <ContextMenuSeparator />}
            </div>
          ),
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
}
