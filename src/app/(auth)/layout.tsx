import React, { ReactNode } from "react";
import AuthLayout from "./AuthLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth | Shatter",
  description: "Shatter authentication",
};

const Layout = ({ children }: { children: ReactNode }) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default Layout;
