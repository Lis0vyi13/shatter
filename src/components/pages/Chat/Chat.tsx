import { ChangeEvent, useEffect, useRef, useState } from "react";

import useUser from "@/hooks/useUser";

import ChatHeader from "./ChatHeader";
import ChatMain from "./ChatMain";

import { IChat } from "@/types/chat";
import Input from "@/components/ui/Inputs/Input";
import Icon from "@/components/ui/Icon";
import { GrAttachment, GrSend } from "react-icons/gr";
import { FaRegSmile } from "react-icons/fa";
import { sendMessage } from "@/services/chat";

const Chat = ({ data }: { data: IChat | null }) => {
  const [value, setValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const user = useUser();
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const usersOnline: unknown[] = []; // todo data?.members...

  useEffect(() => {
    inputRef.current?.focus();
  }, [data]);

  const onSendMessage = async () => {
    if (user && data && value.trim() !== "") {
      await sendMessage(user.uid, data.members[1], value);
      setValue("");
    }
  };
  return (
    <>
      <ChatHeader data={data} user={user} usersOnline={usersOnline} />
      <ChatMain data={data} user={user} />
      <footer className="chat-footer">
        <div className="relative">
          <Input
            ref={inputRef}
            value={value}
            autoComplete="off"
            onChange={onChangeHandler}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSendMessage();
              }
            }}
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
              <GrSend onClick={onSendMessage} />
            </Icon>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Chat;
