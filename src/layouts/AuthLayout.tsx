import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { shouldRedirect } from "@/utils";
import useAuth from "@/hooks/useAuth";

const AuthLayout = () => {
  const navigate = useNavigate();
  const isAuth = useAuth();
  useEffect(() => {
    if (shouldRedirect()) {
      navigate("/c", { replace: true });
    }
    if (localStorage.getItem("googleUserData")) {
      navigate("/create-password", { replace: true });
    }
  }, [navigate, isAuth]);

  return (
    <>
      <div className="min-h-full">
        <Outlet />
      </div>
    </>
  );
};

export default AuthLayout;
