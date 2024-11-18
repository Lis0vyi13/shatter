import { ReactNode, Suspense } from "react";

import ChatLayout from "./ChatLayout";
import Loader from "@/components/ui/Loader";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense fallback={<Loader />}>
      <ChatLayout>{children}</ChatLayout>
    </Suspense>
  );
};

export default Layout;
