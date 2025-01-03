"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";

import Title from "@/components/ui/Title";
import Icon from "@/components/ui/Icon";
import Input from "@/components/ui/Inputs/Input";
import Message from "./Message";

import { IChat, IMessage } from "@/types/chat";

import { CiSearch } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { IoMdMore } from "react-icons/io";
import { GrAttachment, GrMicrophone, GrSend } from "react-icons/gr";
import { FaRegSmile } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import useUser from "@/hooks/useUser";

const messages: IMessage[] = [
  {
    id: "2",
    uid: "2hzT8uBZHXQC8sQssNvZnglb7L53",
    text: "Jaden, my congratulations! I will be glad to work with you on a new project 😉",
    reactions: [],
  },
  {
    id: "4",
    uid: "xItTpjRcmXYJWHhVUpMhO9lX5R53",
    text: "Jaden, my congratulations! I will be glad to work with you on a new project 😉",
    reactions: [],
  },
];

const Chat = ({ data }: { data: IChat }) => {
  const [value, setValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const user = useUser();
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  console.log(data);
  const usersOnline = []; // todo data?.members...

  useEffect(() => {
    inputRef.current?.focus();
  }, [data]);

  return (
    <>
      <header className="chat-header pb-4 bg-white flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Icon>
            <FaArrowLeftLong className="block mdLg:hidden text-[22px]" />
          </Icon>
          <Title className="text-[28px] leading-8">
            {user && data?.title[user?.uid]}
          </Title>
          {data?.chatType === "individual" && data?.members?.length > 2 && (
            <p className="members mt-1 font-[400] text-[13px] text-dark text-opacity-70">
              {data?.members?.length} members, {usersOnline.length}
              online
            </p>
          )}
        </div>
        <div className="flex gap-1 leading-8 text-dark text-opacity-70 text-[28px] items-center">
          <Icon>
            <CiSearch />
          </Icon>
          {data?.chatType === "individual" && data?.members?.length === 2 && (
            <Icon>
              <IoCallOutline />
            </Icon>
          )}
          <Icon>
            <IoMdMore />
          </Icon>
        </div>
      </header>

      <main className="chat-main overflow-y-auto overflow-x-hidden flex flex-col gap-3 flex-1">
        {messages.map((m) => (
          <Message
            collocutorTitle={user && user.uid ? data.title[user?.uid] : ""}
            collocutorAvatar={data.avatar}
            key={m.id}
            data={m}
          />
        ))}
      </main>
      <footer className="chat-footer">
        <div className="relative">
          <Input
            ref={inputRef}
            value={value}
            onChange={onChangeHandler}
            className="bg-opacity-70 bg-lightBlue pl-9 text-dark placeholder:text-opacity-70 text-xs placeholder:text-xs py-4"
            name="message"
            placeholder="Your message"
          />
          <div className="absolute text-[18px] left-1 top-1/2 -translate-y-1/2 leading-[0.7] text-dark text-opacity-70">
            <Icon>
              <GrAttachment />
            </Icon>
          </div>
          <div className="absolute flex items-center gap-1 text-[20px] right-2 top-1/2 -translate-y-1/2 leading-[0.7] text-dark text-opacity-70">
            <Icon>
              <FaRegSmile />
            </Icon>
            <Icon>
              <GrMicrophone />
            </Icon>
            <Icon>
              <GrSend />
            </Icon>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Chat;
