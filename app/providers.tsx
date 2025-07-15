"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthStoreProvider from "@/components/AuthStoreProvider/AuthStoreProvider"; //

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthStoreProvider>{children}</AuthStoreProvider>
    </QueryClientProvider>
  );
}
