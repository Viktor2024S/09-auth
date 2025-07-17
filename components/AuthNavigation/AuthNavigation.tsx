// components/AuthNavigation/AuthNavigation.tsx
"use client";

import Link from "next/link";
// useRouter більше не потрібен тут напряму, якщо перенаправлення робить useAuth.signOut
// import { useRouter } from "next/navigation";
import { useAuth, triggerAuthChange } from "@/hooks/useAuth"; // <--- Імпортуємо useAuth та triggerAuthChange

import css from "./AuthNavigation.module.css";

export default function AuthNavigation() {
  // Тепер user повертається з useAuth
  const { isAuthenticated, user, signOut } = useAuth();

  // const router = useRouter(); // <--- Видалено, оскільки router не використовується

  const handleLogout = async () => {
    try {
      await signOut(); // Викликаємо signOut з useAuth, яке вже включає logoutUser та перенаправлення
      triggerAuthChange(); // Сповіщаємо інші частини UI про зміну стану
    } catch (error) {
      console.error("Logout failed:", error);
      // Тут можна додати тост про помилку
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <li className={css.navigationItem}>
            <Link
              href="/profile"
              prefetch={false}
              className={css.navigationLink}
            >
              Profile
            </Link>
          </li>
          {user && ( // <--- Тепер user має бути доступний
            <li className={css.navigationItem}>
              <p className={css.userEmail}>{user.email}</p>{" "}
              <button onClick={handleLogout} className={css.logoutButton}>
                Logout
              </button>
            </li>
          )}
        </>
      ) : (
        <>
          <li className={css.navigationItem}>
            <Link
              href="/sign-in"
              prefetch={false}
              className={css.navigationLink}
            >
              Login
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link
              href="/sign-up"
              prefetch={false}
              className={css.navigationLink}
            >
              Sign up
            </Link>
          </li>
        </>
      )}
    </>
  );
}
