"use client";

import { useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const TanStackProvider = ({ children }: Props) => {
  const [client] = useState(() => new QueryClient());

  return (
    <>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </>
  );
};

export default TanStackProvider;
