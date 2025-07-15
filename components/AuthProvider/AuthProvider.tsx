"use client";

import { useQuery } from "@tanstack/react-query";
import { checkSession } from "@/lib/api/clientApi";

import { useAuthStore } from "@/components/AuthStoreProvider/AuthStoreProvider"; //
import Loader from "../Loader/Loader";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser, clearIsAuthenticated } = useAuthStore((state) => ({
    setUser: state.setUser,
    clearIsAuthenticated: state.clearIsAuthenticated,
  }));

  const { isLoading } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      try {
        const response = await checkSession();
        if (response.data) {
          setUser(response.data);
        } else {
          clearIsAuthenticated();
        }
        return response.data;
      } catch (error) {
        console.error("Authentication check failed:", error);
        clearIsAuthenticated();
        return null;
      }
    },
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  if (isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
}
