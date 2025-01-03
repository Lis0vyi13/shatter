"use client";

import { useCallback, useState } from "react";

import Block from "@/components/ui/Block";
import Delete from "@/components/ui/Delete";
import ChatDetailsItem from "./ChatDetailsItem";

import { IChat, IChatInfo } from "@/types/chat";

import { MdOutlineInsertPhoto } from "react-icons/md";
import { IoVideocamOutline } from "react-icons/io5";
import { CiFileOn, CiLink } from "react-icons/ci";
import { FaRegFileAudio } from "react-icons/fa";
import { MdOutlineKeyboardVoice } from "react-icons/md";

interface IChatDetails {
  data: IChat;
}

const DETAILS = [
  {
    name: "photos",
    title: "photos",
    Icon: MdOutlineInsertPhoto,
    iconSize: 24,
  },
  {
    name: "videos",
    title: "videos",
    Icon: IoVideocamOutline,
    iconSize: 24,
  },
  {
    name: "files",
    title: "files",
    Icon: CiFileOn,
    iconSize: 24,
  },
  {
    name: "audio",
    title: "audio files",
    Icon: FaRegFileAudio,
    iconSize: 22,
  },
  {
    name: "links",
    title: "shared links",
    Icon: CiLink,
    iconSize: 25,
  },
  {
    name: "voice",
    title: "voice messages",
    Icon: MdOutlineKeyboardVoice,
    iconSize: 23,
  },
];

const ChatDetails = ({ data }: IChatDetails) => {
  const [isInfoVisible, setIsInfoVisible] = useState(true);
  const [isMembersVisible, setIsMembersVisible] = useState(true);

  const toggleSetInfoVisible = useCallback(() => {
    setIsInfoVisible((prev) => !prev);
  }, []);
  const toggleSetMembersVisible = useCallback(() => {
    setIsMembersVisible((prev) => !prev);
  }, []);

  return (
    <section
      className={`chat-details flex flex-col h-full gap-2 ${
        !isInfoVisible && !isMembersVisible ? "w-0" : "w-[300px]"
      }`}
    >
      {isInfoVisible && (
        <Block className="chat-info px-4 py-5 min-h-[54%]">
          <header>
            <h1 className="text-[22px] font-[500] capitalize">Chat Info</h1>
            <Delete
              className="text-[22px] right-4 top-3"
              handler={toggleSetInfoVisible}
            />
          </header>
          <main className="chat-info__content pb-8 mt-3 h-full overflow-auto">
            <h2 className="font-[500] capitalize">Files</h2>
            <div className="details flex flex-col mt-4 gap-2">
              {DETAILS.map((detail) => {
                const info = data.info;
                const value = info[detail.name as keyof IChatInfo];
                return (
                  <ChatDetailsItem
                    key={detail.name}
                    detail={detail}
                    value={value}
                  />
                );
              })}
            </div>
          </main>
        </Block>
      )}
      {isMembersVisible && (
        <Block className="chat-members px-4 py-5">
          <h1 className="text-[18px] font-[500] capitalize">Members</h1>
          <Delete
            className="text-[22px] right-4 top-3"
            handler={toggleSetMembersVisible}
          />
        </Block>
      )}
    </section>
  );
};

export default ChatDetails;
