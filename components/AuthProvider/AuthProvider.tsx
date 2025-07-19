"use client";

import { useEffect } from "react";
import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore((s) => s.setUser);
  const clearAuth = useAuthStore((s) => s.clearIsAuthenticated);

  useEffect(() => {
    async function verifyUser() {
      try {
        const session = await checkSession();

        if (session.success) {
          const currentUser = await getMe();
          if (currentUser) {
            setUser(currentUser);
          }
        } else {
          clearAuth();
        }
      } catch (err) {
        clearAuth();
        console.error("Failed to verify authentication:", err);
      }
    }

    verifyUser();
  }, [clearAuth, setUser]);

  return <>{children}</>;
};

export default AuthProvider;
