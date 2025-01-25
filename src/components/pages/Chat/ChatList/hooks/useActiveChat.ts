import { useState, useEffect } from "react";

const useActiveChat = (id: string | undefined) => {
  const [activeChat, setActiveChat] = useState("");

  useEffect(() => {
    if (id !== activeChat) {
      setActiveChat(id || "");
    }
  }, [id]);

  return { activeChat, setActiveChat };
};

export default useActiveChat;
