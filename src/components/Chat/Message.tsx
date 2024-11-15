"use client";

import { useEffect, useState } from "react";
import useUser from "@/hooks/useUser";
import { getUserById } from "@/services/firebase";

import Avatar from "../Avatar";

import { UserData } from "@/types/user";
import { IMessage } from "@/types/chat";

interface IMessageProps {
  data: IMessage;
}

const Message = ({ data }: IMessageProps) => {
  const [sender, setSender] = useState<UserData | null>(null);
  const currentUser = useUser();
  const isOwnMessage = currentUser?.uid === data.uid;

  useEffect(() => {
    const fetchSender = async () => {
      if (isOwnMessage) {
        setSender(currentUser);
      } else {
        const fetchedSender = await getUserById(data.uid);
        setSender(fetchedSender);
      }
    };

    fetchSender();
  }, [data.uid, currentUser]);

  return (
    <div
      className={`message-block flex gap-2 w-fit ${
        isOwnMessage ? "justify-end self-end flex-row-reverse" : ""
      }`}
    >
      <Avatar
        avatar={sender?.photoUrl}
        title={sender?.displayName}
        className="min-h-[48px] max-h-[48px] max-w-[48px] min-w-[48px] self-end"
      />

      <div
        className={`message relative max-w-[300px] px-4 py-2 pt-3 ${
          isOwnMessage ? "bg-blue text-white" : "bg-[#e0e0f9] text-[#000]"
        } rounded-2xl rounded-br-md shadow-lg`}
      >
        <p className="text-[12px] leading-[18px] font-[300]">
          Jaden, my congratulations! I will be glad to work with you on a new
          project 😉
        </p>
        <div className="flex mt-[2px] items-center justify-end text-sm text-gray-200">
          <span className="text-[11px] font-[400]">09:27</span>
        </div>
        <div
          className={`absolute bottom-0 scale-y-[-1] ${
            isOwnMessage ? "right-[-8px]" : "left-[-8px] scale-x-[-1] "
          }`}
        >
          <div
            className={`w-0 h-0 border-t-[15px] ${
              isOwnMessage ? "border-t-blue" : "border-t-[#e0e0f9]"
            } border-r-[15px] border-r-transparent`}
          />
        </div>
      </div>
    </div>
  );
};

export default Message;
