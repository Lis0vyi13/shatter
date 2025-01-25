import { ChangeEvent, useEffect, useRef, useState } from "react";

import useUser from "@/hooks/useUser";

import ChatHeader from "./ChatHeader";
import ChatMain from "./ChatMain";
import ChatFooter from "./ChatFooter";

import { IChat } from "@/types/chat";
import { TEST_MESSAGES } from "./Chat.constants";

const Chat = ({ data }: { data: IChat }) => {
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

  return (
    <>
      <ChatHeader data={data} user={user} usersOnline={usersOnline} />
      <ChatMain messages={TEST_MESSAGES} data={data} user={user} />
      <ChatFooter
        value={value}
        onChangeHandler={onChangeHandler}
        inputRef={inputRef}
      />
    </>
  );
};

export default Chat;
