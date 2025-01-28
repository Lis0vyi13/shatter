import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";

const useAuth = () => {
  const [authState, setAuthState] = useState<null | boolean>(null);

  useEffect(() => {
    if (!auth) {
      setAuthState(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthState(!!user);
    });

    return () => unsubscribe();
  }, []);

  return authState;
};

export default useAuth;
