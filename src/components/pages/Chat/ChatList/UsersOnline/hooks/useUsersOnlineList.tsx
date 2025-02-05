import { useEffect, useRef, Dispatch } from "react";
import { onValue, ref } from "firebase/database";
import { dbRealtime } from "@/firebase/firebaseConfig";
import { IUserStatus } from "@/types/user";

export interface IChatParticipantsCard {
  chatId: string;
  participant: string;
  title: string;
  avatar: string;
  userStatus: IUserStatus | null;
}

const useUsersOnlineList = (
  data: IChatParticipantsCard[] | null,
  setParticipants: Dispatch<
    React.SetStateAction<IChatParticipantsCard[] | null>
  >,
) => {
  const listRef = useRef<HTMLElement | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const list = listRef.current;

    if (list) {
      const isTouchDevice =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;

      if (isTouchDevice) {
        const handleTouchStart = (e: TouchEvent) => {
          isDragging.current = true;
          startX.current = e.touches[0].pageX - list.offsetLeft;
          scrollLeft.current = list.scrollLeft;
        };

        const handleTouchEnd = () => {
          isDragging.current = false;
        };

        const handleTouchMove = (e: TouchEvent) => {
          if (!isDragging.current) return;
          e.preventDefault();
          const x = e.touches[0].pageX - list.offsetLeft;
          const walk = x - startX.current;
          list.scrollLeft = scrollLeft.current - walk;
        };

        list.addEventListener("touchstart", handleTouchStart);
        list.addEventListener("touchend", handleTouchEnd);
        list.addEventListener("touchmove", handleTouchMove);

        return () => {
          list.removeEventListener("touchstart", handleTouchStart);
          list.removeEventListener("touchend", handleTouchEnd);
          list.removeEventListener("touchmove", handleTouchMove);
        };
      }
    }
  }, []);

  useEffect(() => {
    data?.forEach((chat) => {
      const userStatusRef = ref(dbRealtime, `users/${chat.participant}/status`);

      const unsubscribe = onValue(userStatusRef, (snapshot) => {
        const status = snapshot.val();
        if (status) {
          setParticipants((prevStatus) => {
            if (prevStatus) {
              return prevStatus.map((data) =>
                data.participant === chat.participant
                  ? { ...data, status }
                  : data,
              );
            }
            return prevStatus;
          });
        }
      });

      return () => {
        unsubscribe();
      };
    });
  }, [data, setParticipants]);

  return listRef;
};

export default useUsersOnlineList;
