import React, { ReactNode } from "react";

const HomeContainer = ({ children }: { children: ReactNode }) => {
  return <div className="container mx-auto">{children}</div>;
};

export default HomeContainer;
