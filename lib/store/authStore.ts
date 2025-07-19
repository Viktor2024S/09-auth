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
    (update) => ({
      isAuthenticated: false,
      user: null,
      setUser: (userObj: User) => {
        update(() => ({
          user: userObj,
          isAuthenticated: true,
        }));
      },

      clearIsAuthenticated: () => {
        update(() => ({
          user: null,
          isAuthenticated: false,
        }));
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
