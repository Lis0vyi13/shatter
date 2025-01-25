import { Suspense, useEffect, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import useAuth from "@/hooks/useAuth";
import { useApp } from "@/hooks/useApp";

import Sidebar from "@/components/Sidebar";
import Loader from "@/components/ui/Loader";
import useChatLayout from "@/components/pages/Chat/hooks/useChatLayout";

const ChatLayout = () => {
  useApp();
  useChatLayout();

  const mainRef = useRef(null);
  const isLogin = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin === false) {
      navigate("/login", { replace: true });
      return;
    }
    if (localStorage.getItem("googleUserData")) {
      navigate("/create-password", { replace: true });
    }
  }, [isLogin, navigate]);

  return isLogin ? (
    <Suspense fallback={<Loader />}>
      <div className="px-4 py-2 flex h-full min-h-full">
        <section className="wrapper flex-1 bg-dark rounded-[26px] flex">
          <aside className="hidden justify-center min-w-[96px] sm:flex">
            <Sidebar />
          </aside>
          <main ref={mainRef} className="flex flex-1 py-2">
            <Outlet />
          </main>
        </section>
      </div>
    </Suspense>
  ) : (
    <Loader />
  );
};

export default ChatLayout;