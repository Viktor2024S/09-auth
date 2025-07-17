// components/AuthStoreProvider/AuthStoreProvider.tsx
"use client";

import { createContext, useContext } from "react";
import { useStoreWithEqualityFn } from "zustand/traditional";
import {
  AuthStoreType, // Імпортуємо тип стану стору (інтерфейс, який ми визначили)
  useAuth, // Імпортуємо сам хук/стор Zustand
} from "@/lib/store/authStore";
import { StoreApi, UseBoundStore } from "zustand"; // ОБОВ'ЯЗКОВО: імпортуємо StoreApi та UseBoundStore для коректної типізації

// 1. Коригуємо тип AuthStoreContext
// Він має зберігати інстанс Zustand-стору, який повертає функція create.
// Це UseBoundStore<StoreApi<AuthStoreType>>
export const AuthStoreContext = createContext<UseBoundStore<
  StoreApi<AuthStoreType>
> | null>(null);

export default function AuthStoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Передаємо сам хук useAuth до value провайдера контексту.
  // useAuth вже є інстансом прив'язаного стору, створеного Zustand.
  return (
    <AuthStoreContext.Provider value={useAuth}>
      {children}
    </AuthStoreContext.Provider>
  );
}

// 2. Коригуємо типізацію хука useAuthStore
// authStoreContext тепер буде мати коректний тип UseBoundStore<StoreApi<AuthStoreType>>
export const useAuthStore = <T,>(selector: (state: AuthStoreType) => T): T => {
  const authStoreContext = useContext(AuthStoreContext);

  if (!authStoreContext) {
    throw new Error(`useAuthStore must be used within AuthStoreProvider`);
  }

  // useStoreWithEqualityFn очікує StoreApi як перший аргумент.
  // authStoreContext (який є UseBoundStore<StoreApi<AuthStoreType>>)
  // можна передати напряму, оскільки UseBoundStore включає StoreApi.
  return useStoreWithEqualityFn(authStoreContext, selector);
};
