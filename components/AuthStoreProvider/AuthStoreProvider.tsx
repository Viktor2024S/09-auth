"use client";

import { useRef, createContext, useContext } from "react";
import { useStoreWithEqualityFn } from "zustand/traditional";
import { createAuthStore, AuthStore, AuthState } from "@/lib/store/authStore"; //

export const AuthStoreContext = createContext<AuthStore | null>(null);

export const useAuthStore = <T,>(
  selector: (store: AuthState) => T,
  equals?: (a: T, b: T) => boolean
): T => {
  const authStoreContext = useContext(AuthStoreContext);

  if (!authStoreContext) {
    throw new Error(`useAuthStore must be used within AuthStoreProvider`);
  }

  return useStoreWithEqualityFn(authStoreContext, selector, equals);
};

export default function AuthStoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AuthStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = createAuthStore();
  }

  return (
    <AuthStoreContext.Provider value={storeRef.current}>
      {children}
    </AuthStoreContext.Provider>
  );
}
