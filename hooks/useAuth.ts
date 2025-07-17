// hooks/useAuth.ts
"use client";

// Оновлений імпорт: функції автентифікації знаходяться у clientApi.ts
import { checkSession, logoutUser as logout } from "@/lib/api/clientApi"; // <--- ОНОВЛЕНО тут

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// ... решта коду useAuth залишається такою ж, як ви надавали раніше ...

const AUTH_CHANGE_EVENT = "auth-change";

export const triggerAuthChange = () => {
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
};

export const useAuth = () => {
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const signOut = async () => {
    await logout(); // Це викличе logoutUser з clientApi
    router.replace("/sign-in");
  };

  const checkAuth = async () => {
    try {
      const res = await checkSession(); // Це викличе checkSession з clientApi
      if (res) {
        setIsAuthenticated(true);
        // ...
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
    const handleAuthChange = () => checkAuth();
    window.addEventListener(AUTH_CHANGE_EVENT, handleAuthChange);
    return () => {
      window.removeEventListener(AUTH_CHANGE_EVENT, handleAuthChange);
    };
  }, []);

  return {
    isAuthenticated,
    isLoading,
    signOut,
    reCheckAuth: checkAuth,
  };
};
