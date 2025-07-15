import { createStore } from "zustand";
import { User } from "@/types/user";

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
  setAuthenticated: (status: boolean) => void;
}

export const createAuthStore = () =>
  createStore<AuthState>()((set) => ({
    isAuthenticated: false,
    user: null,
    setUser: (user) => set({ user, isAuthenticated: true }),
    clearIsAuthenticated: () => set({ user: null, isAuthenticated: false }),
    setAuthenticated: (status) => set({ isAuthenticated: status }),
  }));

export type AuthStore = ReturnType<typeof createAuthStore>;
