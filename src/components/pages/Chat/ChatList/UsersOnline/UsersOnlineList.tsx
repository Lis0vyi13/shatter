import { Dispatch, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/redux/app/hooks";
import { AnimatePresence, motion } from "framer-motion";

import useUsersOnlineList from "./hooks/useUsersOnlineList";
import { scrollToChatLink } from "@/utils";

import UsersOnlineCard from "./UsersOnlineCard";
import UsersOnlineCardSkeleton from "./UsersOnlineCard.skeleton";

import { IParticipantOnline } from "@/types/chat";
import { fadeIn } from "@/constants/animations";

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
      <AnimatePresence>
        <motion.div className="flex gap-1 will-change-transform" {...fadeIn}>
          {participantsList
            ? participantsList?.map((chat) => (
                <motion.div
                  key={chat.chatId}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    className="rounded-full w-fit h-fit"
                    to={`/c/${chat.chatId}`}
                  >
                    <UsersOnlineCard data={chat} />
                  </Link>
                </motion.div>
              ))
            : data?.map((chat) => (
                <motion.div
                  key={chat.chatId}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    className="rounded-full w-fit h-fit"
                    onClick={() => scrollToChatLink(listRef, chat.chatId)}
                    to={`/c/${chat.chatId}`}
                  >
                    <UsersOnlineCard data={chat} />
                  </Link>
                </motion.div>
              ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default UsersOnlineList;
