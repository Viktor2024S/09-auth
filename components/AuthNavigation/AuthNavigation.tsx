// components/AuthNavigation/AuthNavigation.tsx
// ================================================
"use client";

import Link from "next/link";
import { useAuth, triggerAuthChange } from "@/hooks/useAuth";

import css from "./AuthNavigation.module.css";

export default function AuthNavigation() {
  const { isAuthenticated, isLoading, signOut } = useAuth();
  const handleLogout = async () => {
    try {
      await signOut();
      triggerAuthChange();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isLoading) {
    return <li className={css.navigationItem}>Loading auth nav...</li>; // Or return null if you prefer nothing to show during loading
  }

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
          <li className={css.navigationItem}>
            <button onClick={handleLogout} className={css.logoutButton}>
              Logout
            </button>
          </li>
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
