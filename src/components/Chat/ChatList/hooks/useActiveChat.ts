import { useState, useEffect } from "react";

const useActiveChat = (id: string | undefined) => {
  const [activeChat, setActiveChat] = useState<string>("");

  useEffect(() => {
    if (id !== activeChat) {
      setActiveChat(id || "");
    }
  }, [id, activeChat]);

  return { activeChat, setActiveChat };
};

export default useActiveChat;
