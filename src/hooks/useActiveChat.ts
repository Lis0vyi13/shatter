import { useAppSelector } from "@/redux/app/hooks";

const useActiveChat = () => {
  const activeChat = useAppSelector((store) => store.chat.activeChat);

  return activeChat;
};

export default useActiveChat;
