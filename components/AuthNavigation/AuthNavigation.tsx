"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import styles from "./AuthNavigation.module.css";

const AuthNavigation = () => {
  const router = useRouter();
  const currentUser = useAuthStore((s) => s.user);
  const loggedIn = useAuthStore((s) => s.isAuthenticated);
  const resetAuth = useAuthStore((s) => s.clearIsAuthenticated);

  const onLogoutClick = async () => {
    await logout();
    resetAuth();
    router.push("/sign-in");
  };

  if (!loggedIn) {
    return (
      <>
        <li className={styles.navigationItem}>
          <Link
            className={styles.navigationLink}
            href="/sign-in"
            prefetch={false}
          >
            Login
          </Link>
        </li>
        <li className={styles.navigationItem}>
          <Link
            className={styles.navigationLink}
            href="/sign-up"
            prefetch={false}
          >
            Sign up
          </Link>
        </li>
      </>
    );
  }

  return (
    <>
      <li className={styles.navigationItem}>
        <Link
          className={styles.navigationLink}
          href="/profile"
          prefetch={false}
        >
          Profile
        </Link>
      </li>
      <li className={styles.navigationItem}>
        <p className={styles.userEmail}>
          User: {currentUser?.username ?? currentUser?.email}
        </p>
        <button className={styles.logoutButton} onClick={onLogoutClick}>
          Logout
        </button>
      </li>
    </>
  );
};

export default AuthNavigation;
