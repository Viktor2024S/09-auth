// lib/store/authStore.ts
import { create } from "zustand";
import { User } from "@/types/user";

// Експортуємо тип AuthStore, щоб його можна було використовувати в інших файлах
export type AuthStore = {
  // <--- Додано 'export' тут
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
};

export const useAuthStore = create<AuthStore>()((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user: User) => {
    set(() => ({ user, isAuthenticated: true }));
  },
  clearIsAuthenticated: () => {
    set(() => ({ user: null, isAuthenticated: false }));
  },
}));
