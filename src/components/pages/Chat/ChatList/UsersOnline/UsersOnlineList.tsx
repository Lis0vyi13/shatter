import { Dispatch, useEffect } from "react";
import { Link } from "react-router-dom";

import useUsersOnlineList, {
  IChatParticipantsCard,
} from "./hooks/useUsersOnlineList";

import UsersOnlineCard from "./UsersOnlineCard";
import UsersOnlineCardSkeleton from "./UsersOnlineCard.skeleton";

const UsersOnlineList = ({
  data,
  setParticipants,
}: {
  data: IChatParticipantsCard[] | null;
  setParticipants: Dispatch<
    React.SetStateAction<IChatParticipantsCard[] | null>
  >;
}) => {
  const listRef = useUsersOnlineList(data, setParticipants);

  useEffect(() => {
    const container = listRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      requestAnimationFrame(() => {
        container.scrollBy({
          left: e.deltaY * 2,
          behavior: "smooth",
        });
      });
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [listRef]);

  return (
    <section
      ref={listRef}
      className="flex items-center gap-1 pb-1 overflow-x-auto users-online-scrollbar"
    >
      {!data &&
        Array.from({ length: 5 }).map((_, index) => (
          <UsersOnlineCardSkeleton key={index} />
        ))}
      {data?.map((chat) => (
        <Link
          className="rounded-full w-fit h-fit"
          key={chat.chatId}
          to={`/c/${chat.chatId}`}
        >
          <UsersOnlineCard key={chat.chatId} data={chat} />
        </Link>
      ))}
    </section>
  );
};

export default UsersOnlineList;
