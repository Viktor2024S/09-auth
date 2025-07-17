"use client";

import { useEffect, useCallback } from "react";

import { useAuthStore } from "@/components/AuthStoreProvider/AuthStoreProvider";
import { checkSession } from "@/lib/api/clientApi";
import { AuthStoreType } from "@/lib/store/authStore";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuth, setUser, clearAuth } = useAuthStore(
    (state: AuthStoreType) => ({
      user: state.user,
      isAuth: state.isAuth,
      setUser: state.setUser,
      clearAuth: state.clearAuth,
    })
  );

  const verifySession = useCallback(async () => {
    try {
      const userData = await checkSession();
      if (userData) {
        setUser(userData);
      } else {
        clearAuth();
      }
    } catch (error) {
      console.error("Помилка перевірки сесії:", error);
      clearAuth();
    }
  }, [setUser, clearAuth]);

  useEffect(() => {
    if (!isAuth && user === null) {
      verifySession();
    }
  }, [isAuth, user, verifySession]);

  return <>{children}</>;
}
