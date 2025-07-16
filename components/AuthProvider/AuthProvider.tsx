// components/AuthProvider/AuthProvider.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { checkSession } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import Loader from "../Loader/Loader";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser } = useAuthStore(); // Removed unused 'isAuthenticated'

  const { isLoading } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      try {
        const data = await checkSession();
        // data will be { user: User } or null
        setUser(data?.user || null);
        return data;
      } catch {
        setUser(null);
        return null;
      }
    },
    retry: 0,
    refetchOnWindowFocus: false,
    staleTime: 60 * 60 * 1000, // 1 hour
  });

  if (isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
}
