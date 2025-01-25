import { ChangeEvent } from "react";

import Icon from "@/components/ui/Icon";
import Input from "@/components/ui/Inputs/Input";

import { FaRegSmile } from "react-icons/fa";
import { GrAttachment, GrMicrophone, GrSend } from "react-icons/gr";

const ChatFooter = ({
  value,
  onChangeHandler,
  inputRef,
}: {
  value: string;
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}) => (
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
);

export default ChatFooter;
