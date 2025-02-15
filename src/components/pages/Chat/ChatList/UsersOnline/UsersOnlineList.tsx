import { Dispatch, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/redux/app/hooks";

import useUsersOnlineList from "./hooks/useUsersOnlineList";
import { scrollToChatLink } from "@/utils";

import UsersOnlineCard from "./UsersOnlineCard";
import UsersOnlineCardSkeleton from "./UsersOnlineCard.skeleton";

import { IParticipantOnline } from "@/types/chat";

const UsersOnlineList = ({
  data,
  setParticipants,
  listRef,
}: {
  data: IParticipantOnline[] | null;
  setParticipants: Dispatch<React.SetStateAction<IParticipantOnline[] | null>>;
  listRef: React.MutableRefObject<HTMLDivElement | null>;
}) => {
  const participantsList = useAppSelector(
    (store) => store.chat.onlineParticipants,
  );
  const usersOnlineListRef = useUsersOnlineList(data, setParticipants);
  useEffect(() => {
    const container = usersOnlineListRef.current;
    if (!container) return;

    let isScrolling = false;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (!isScrolling) {
        isScrolling = true;
        requestAnimationFrame(() => {
          container.scrollBy({
            left: e.deltaY * 2.2,
            behavior: "smooth",
          });
          isScrolling = false;
        });
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [usersOnlineListRef]);

  return (
    <section
      ref={usersOnlineListRef}
      className="flex items-center gap-1 pb-1 overflow-x-auto users-online-scrollbar"
    >
      {!data &&
        !participantsList &&
        Array.from({ length: 5 }).map((_, index) => (
          <UsersOnlineCardSkeleton key={index} />
        ))}
      {data
        ? data.map((chat) => (
            <Link
              className="rounded-full w-fit h-fit"
              key={chat.chatId}
              onClick={() => scrollToChatLink(listRef, chat.chatId)}
              to={`/c/${chat.chatId}`}
            >
              <UsersOnlineCard key={chat.chatId} data={chat} />
            </Link>
          ))
        : participantsList?.map((chat) => (
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
