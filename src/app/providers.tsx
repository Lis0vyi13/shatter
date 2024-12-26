"use client";

import { store } from "@/redux/app/store";
import { ReactNode, useEffect, useRef } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { Toaster } from "sonner";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  const loadingBarRef = useRef<LoadingBarRef>(null);

  useEffect(() => {
    loadingBarRef.current?.continuousStart();

    const timer = setTimeout(() => {
      loadingBarRef.current?.complete();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ReduxProvider store={store}>
      <Toaster toastOptions={{ className: "toaster" }} richColors />
      <LoadingBar
        color="#7678ed"
        height={3}
        shadow={true}
        ref={loadingBarRef}
      />
      {children}
    </ReduxProvider>
  );
};

export default Providers;
