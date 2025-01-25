import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { auth } from "@/firebase/firebaseConfig";

const HomeLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(() => {
      setIsLoggedIn(true);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/c", { replace: true });
    }
  }, [navigate, isLoggedIn]);

  return (
    <section className="text-white overflow-y-auto min-h-full bg-home bg-cover">
      <Outlet />
    </section>
  );
};

export default HomeLayout;
