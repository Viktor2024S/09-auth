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
        if (data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
        return data;
      } catch (error) {
        console.error("Failed to fetch session:", error);
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
