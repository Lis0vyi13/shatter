import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import useAuth from "@/hooks/useAuth";

const HomeLayout = () => {
  const authState = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authState === false) {
      return;
    }

    if (authState === true) {
      navigate("/c", { replace: true });
    }
  }, [authState, navigate]);

  return (
    <>
      <Helmet>
        <title>Shatter</title>
        <meta name="description" content="Shatter web messenger" />
      </Helmet>
      <section className="text-white overflow-y-auto min-h-full bg-home bg-cover">
        <Outlet />
      </section>
    </>
  );
};

export default HomeLayout;
