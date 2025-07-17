// components/AuthStoreProvider/AuthStoreProvider.tsx
"use client";

import { createContext, useContext } from "react";
import { useStoreWithEqualityFn } from "zustand/traditional";
import {
  AuthStore,
  useAuthStore as useZustandCoreAuthStore, // <--- Перейменовано імпорт основного Zustand стору
} from "@/lib/store/authStore";
import { StoreApi, UseBoundStore } from "zustand";

export const AuthStoreContext = createContext<UseBoundStore<
  StoreApi<AuthStore>
> | null>(null);

export default function AuthStoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthStoreContext.Provider value={useZustandCoreAuthStore}>
      {" "}
      {/* Використовуємо перейменований основний стор */}
      {children}
    </AuthStoreContext.Provider>
  );
}

// Перейменовано експортований хук, щоб уникнути конфлікту імен
export const useAuthContextConsumer = <T,>(
  selector: (state: AuthStore) => T
): T => {
  const authStoreContext = useContext(AuthStoreContext);

  if (!authStoreContext) {
    throw new Error(
      `useAuthContextConsumer must be used within AuthStoreProvider`
    );
  }

  return useStoreWithEqualityFn(authStoreContext, selector);
};
