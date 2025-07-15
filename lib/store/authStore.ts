import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "@/types/user";
import { StoreApi, UseBoundStore } from "zustand";

const noopStorage: Storage = {
  getItem: (_: string) => {
    void _;
    return null;
  },
  setItem: (_: string, __: string) => {
    void _;
    void __;
  },
  removeItem: (_: string) => {
    void _;
  },

  length: 0,
  clear: () => {},
  key: (_: number) => {
    void _;
    return null;
  },
};

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
  setIsAuthenticated: (status: boolean) => void;
  clearIsAuthenticated: () => void;
}

export const dummyAuthStore: UseBoundStore<StoreApi<AuthState>> =
  create<AuthState>()(() => ({
    isAuthenticated: false,
    user: null,
    setUser: () => {},
    setIsAuthenticated: () => {},
    clearIsAuthenticated: () => {},
  }));

export type AuthStoreType = UseBoundStore<StoreApi<AuthState>>;

export const createAuthStore = (): AuthStoreType =>
  create<AuthState>()(
    persist(
      (set) => ({
        isAuthenticated: false,
        user: null,
        setUser: (user) => set({ user, isAuthenticated: !!user }),
        setIsAuthenticated: (status) => set({ isAuthenticated: status }),
        clearIsAuthenticated: () => set({ isAuthenticated: false, user: null }),
      }),
      {
        name: "auth-storage",
        storage: createJSONStorage(() =>
          typeof window !== "undefined" ? localStorage : noopStorage
        ),
      }
    )
  );
