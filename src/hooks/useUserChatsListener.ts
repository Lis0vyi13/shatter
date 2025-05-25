import { useEffect } from "react";
import { onValue, ref, off, DataSnapshot } from "firebase/database";
import useUser from "@/hooks/useUser";
import useActions from "@/hooks/useActions";
import { dbRealtime } from "@/firebase/firebaseConfig";

const useUserChatsListener = () => {
  const user = useUser();
  const { setUser } = useActions();

  useEffect(() => {
    if (!user?.uid) return;

    const userRef = ref(dbRealtime, `users/${user.uid}`);

    const callback = (snapshot: DataSnapshot) => {
      const userData = snapshot.val();
      if (userData?.chats) {
        setUser(userData);
      }
    };

    onValue(userRef, callback);

    return () => {
      off(userRef, "value", callback);
    };
  }, [user?.uid, setUser]);
};

export default useUserChatsListener;

// import { useEffect } from "react";
// import { onValue, ref, off } from "firebase/database";
// import useUser from "@/hooks/useUser";
// import useActions from "@/hooks/useActions";
// import { dbRealtime } from "@/firebase/firebaseConfig";

// const useUserChatsListener = () => {
//   const user = useUser();
//   const { setUser } = useActions();

//   useEffect(() => {
//     if (!user?.uid) return;

//     const userRef = ref(dbRealtime, `users/${user.uid}`);

//     const unsubscribe = onValue(userRef, (snapshot) => {
//       const userData = snapshot.val();
//       if (userData?.chats) {
//         setUser(userData);
//       }
//     });

//     return () => {
//       off(userRef);
//     };
//   }, [user?.uid, setUser]);
// };

// export default useUserChatsListener;
