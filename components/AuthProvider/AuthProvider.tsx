"use client";

import { useEffect } from "react";
import { getMe, checkSession } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUserData = useAuthStore((state) => state.setUser);

  const resetAuth = useAuthStore((state) => state.clearIsAuthenticated);

  useEffect(() => {
    async function verifyUser() {
      try {
        const sessionStatus = await checkSession();

        if (sessionStatus.success) {
          const currentUser = await getMe();

          if (currentUser) {
            setUserData(currentUser);
          }
        } else {
          resetAuth();
        }
      } catch (err) {
        resetAuth();
        console.error("Failed to verify authentication:", err);
      }
    }

    verifyUser();
  }, [setUserData, resetAuth]);

  return <>{children}</>;
};

export default AuthProvider;
