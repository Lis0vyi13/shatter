import { ChangeEvent, useEffect, useRef, useState } from "react";

import useUser from "@/hooks/useUser";

import ChatHeader from "./ChatHeader";
import ChatMain from "./ChatMain";

import { IChat } from "@/types/chat";
import Input from "@/components/ui/Inputs/Input";
import Icon from "@/components/ui/Icon";
import { GrSend } from "react-icons/gr";
import { FaRegSmile } from "react-icons/fa";
import { sendMessage } from "@/services/chat";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

const Chat = ({ data }: { data: IChat | null }) => {
  const [value, setValue] = useState<string>("");
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);
  const user = useUser();
  const usersOnline: unknown[] = [];
  const chatId = data?.id;

  useEffect(() => {
    inputRef.current?.focus();
    setIsEmojiOpen(false);
  }, [data]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target as Node)) {
        setIsEmojiOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onSendMessage = async () => {
    if (user && data && value.trim() !== "") {
      setValue("");
      const memberIds = Object.keys(data.members);
      const receiverId = memberIds.find((id) => id !== user.uid);
      if (!receiverId) return;
      await sendMessage(user.uid, receiverId, value, chatId!);
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setValue((prev) => prev + emojiData.emoji);
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
            onKeyDown={(e) => e.key === "Enter" && onSendMessage()}
            className="bg-opacity-70 bg-lightBlue pl-5 text-dark placeholder:text-opacity-70 text-xs placeholder:text-xs py-4 pr-20"
            name="message"
            placeholder="Your message"
          />

          <div className="absolute flex items-center gap-1 text-[20px] right-2 top-1/2 -translate-y-1/2 leading-[0.7] text-dark text-opacity-70">
            <Icon onClick={() => setIsEmojiOpen((prev) => !prev)}>
              <FaRegSmile />
            </Icon>
            <Icon onClick={onSendMessage}>
              <GrSend />
            </Icon>
          </div>

          {isEmojiOpen && (
            <div
              ref={emojiRef}
              className="absolute bottom-[60px] right-2 z-10 scale-75 origin-bottom-right"
            >
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>
      </footer>
    </>
  );
};

export default Chat;
