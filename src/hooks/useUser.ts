import { useAppSelector } from "@/redux/app/hooks";

const useUser = () => {
  const user = useAppSelector((store) => store.user.user);
  return user;
};

export default useUser;
