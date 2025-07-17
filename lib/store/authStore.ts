// lib/store/authStore.ts
import { create } from "zustand";
import { User } from "@/types/user";

// Визначення інтерфейсу стану автентифікації
export type AuthStoreType = {
  isAuth: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearAuth: () => void;
};

export const useAuth = create<AuthStoreType>()((set) => ({
  isAuth: false,
  user: null,
  // Функція для встановлення користувача та статусу автентифікації
  setUser: (user: User) => set({ user, isAuth: true }),
  // Функція для очищення даних автентифікації
  clearAuth: () =>
    set({
      isAuth: false,
      user: null,
    }),
}));
