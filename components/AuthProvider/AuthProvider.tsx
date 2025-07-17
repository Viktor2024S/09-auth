"use client";

import { useRouter } from "next/navigation";
import navStyles from "./AuthNavigation.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { logout } from "@/lib/api/clientApi";
import Link from "next/link";

const UserAuthStatusDisplay = () => {
  const appNavigator = useRouter();
  const resetAuthenticationState = useAuthStore(
    (state) => state.clearIsAuthenticated
  );
  const currentUser = useAuthStore((state) => state.user);
  const isUserAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const performLogoutAction = async () => {
    await logout();
    resetAuthenticationState();
    appNavigator.push("/sign-in");
  };

  return isUserAuthenticated ? (
    <>
      <li className={navStyles.navigationItem}>
        <Link
          href="/profile"
          prefetch={false}
          className={navStyles.navigationLink}
        >
          Profile
        </Link>
      </li>
      <li className={navStyles.navigationItem}>
        <p className={navStyles.userEmail}>
          User: {currentUser?.username || currentUser?.email}
        </p>
        <button
          className={navStyles.logoutButton}
          onClick={performLogoutAction}
        >
          Logout
        </button>
      </li>
    </>
  ) : (
    <>
      <li className={navStyles.navigationItem}>
        <Link
          href="/sign-in"
          prefetch={false}
          className={navStyles.navigationLink}
        >
          Login
        </Link>
      </li>

      <li className={navStyles.navigationItem}>
        <Link
          href="/sign-up"
          prefetch={false}
          className={navStyles.navigationLink}
        >
          Sign up
        </Link>
      </li>
    </>
  );
};

export default UserAuthStatusDisplay;
