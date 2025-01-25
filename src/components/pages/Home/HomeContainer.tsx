import { ReactNode } from "react";

const HomeContainer = ({ children }: { children: ReactNode }) => {
  return <div className="container mx-auto px-4">{children}</div>;
};

export default HomeContainer;
