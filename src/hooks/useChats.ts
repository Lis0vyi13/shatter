import { useAppSelector } from "@/redux/app/hooks";

const useChats = () => {
  const chats = useAppSelector((store) => store.chat.chats);
  return chats;
};

export default useChats;
