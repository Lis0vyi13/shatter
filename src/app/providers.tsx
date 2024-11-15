"use client";

import { store } from "@/redux/app/store";
import { ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { Toaster } from "sonner";

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <ReduxProvider store={store}>
      <Toaster toastOptions={{ className: "toaster" }} richColors />
      {children}
    </ReduxProvider>
  );
};

export default Providers;
