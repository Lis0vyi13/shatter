import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

import useUser from "@/hooks/useUser";

import { IChat } from "@/types/chat";

interface ChatAccessGuardProps {
  children: React.ReactNode;
}

const ChatAccessGuard = ({ children }: ChatAccessGuardProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = useUser();

  useEffect(() => {
    const checkChatAccess = async () => {
      const isDirectNavigation = window.history.length === 1;

      if (!isDirectNavigation) return;

      if (!id || !currentUser) {
        navigate("/c");
        return;
      }

      try {
        const chatRef = doc(db, "chats", id);
        const favoriteRef = doc(db, "favorites", id);

        const chatDoc = await getDoc(chatRef);
        const favoriteDoc = await getDoc(favoriteRef);

        const isChat = chatDoc.exists();
        const isFavorite = favoriteDoc.exists();

        if (!isChat && !isFavorite) {
          navigate("/c");
          return;
        }

        let hasAccess = false;

        if (isChat) {
          const chatData = chatDoc.data() as IChat;
          hasAccess =
            Array.isArray(chatData.members) &&
            (chatData.members.length === 1 ||
              chatData.members.includes(currentUser.uid));
        } else if (isFavorite) {
          hasAccess = true;
        }

        if (!hasAccess) {
          navigate("/c");
        }
      } catch (error) {
        console.error("Error checking chat access:", error);
        navigate("/c");
      }
    };

    checkChatAccess();
  }, [currentUser, id, navigate]);
  return <>{children}</>;
};

export default ChatAccessGuard;
