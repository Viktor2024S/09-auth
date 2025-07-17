"use client";

import { useAuth } from "@/hooks/useAuth"; // Імпортуємо хук useAuth від ментора
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const privateRoutes = ["/profile", "/notes"];

type Props = {
  children: React.ReactNode;
};

export default function AuthStoreProvider({ children }: Props) {
  // Назва компонента за замовчуванням
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);
  // Отримуємо isAuthenticated, isLoading та reCheckAuth з хука useAuth від ментора
  const { isAuthenticated, isLoading, reCheckAuth } = useAuth();
  const pathname = usePathname();

  const isPrivate = privateRoutes.some((route) => pathname.startsWith(route));

  useEffect(() => {
    setHasCheckedAuth(false);
  }, [pathname]);

  useEffect(() => {
    const fn = async () => {
      try {
        if (isPrivate && !hasCheckedAuth) {
          await reCheckAuth();
          setHasCheckedAuth(true);
        }
      } catch (error) {
        console.error("Error during auth check in AuthStoreProvider:", error);
      } finally {
      }
    };
    fn();
  }, [pathname, isPrivate, reCheckAuth, hasCheckedAuth]);

  if (isLoading || (isPrivate && !hasCheckedAuth)) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated && isPrivate) {
    // Якщо користувач не автентифікований і маршрут приватний,
    // тут можна додати логіку перенаправлення, якщо useAuth не робить цього автоматично.
    // console.log('User not authenticated for private route.');
    return null; // Або `<Navigate to="/sign-in" />`
  }

  return <>{children}</>;
}
