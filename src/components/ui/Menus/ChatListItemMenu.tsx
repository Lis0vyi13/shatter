import { ReactNode, useMemo } from "react";

import useUser from "@/hooks/useUser";

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
import { useChatActions } from "./useChatActions";

interface IChatListItemMenu {
  data: IChat;
  children?: ReactNode;
}

export function ChatListItemMenu({ data, children }: IChatListItemMenu) {
  const labelWithIconClassName =
    "absolute left-[2rem] top-1/2 -translate-y-1/2";
  const user = useUser();
  const { openChat, doTogglePinChat } = useChatActions();

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
        label: data.isPin ? "Unpin" : "Pin",
        separator: false,
        action: async () => {
          if (user) {
            await doTogglePinChat(user.uid, data.id);
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
        action: () => {},
      },
    ],
    [data.id, data.isPin, doTogglePinChat, openChat, user]
  );

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-56">
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
