"use client";

import { useQuery } from "@tanstack/react-query";
import { getSession } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import Loader from "../Loader/Loader";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser } = useAuthStore();

  const { isLoading } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      try {
        const data = await getSession();
        setUser(data.user || null);
        return data;
      } catch {
        setUser(null);
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
