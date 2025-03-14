"use client";

import { SessionProvider } from "next-auth/react";

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {

  return (
    <SessionProvider>{children}</SessionProvider>
  );
};

export default ReactQueryProvider;