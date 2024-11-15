import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";

const useAuth = () => {
  const [authState, setAuthState] = useState<null | boolean>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user?.emailVerified) {
        setAuthState(true);
      } else {
        setAuthState(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return authState;
};

export default useAuth;
