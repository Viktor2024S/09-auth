import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types/user";

export interface AuthStore {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (update) => {
      return {
        isAuthenticated: false,
        user: null,

        setUser(user: User) {
          update(() => ({ user, isAuthenticated: true }));
        },

        clearIsAuthenticated() {
          update(() => ({ user: null, isAuthenticated: false }));
        },
      };
    },
    {
      name: "auth-storage",
    }
  )
);
