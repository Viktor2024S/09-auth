"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "@/lib/api/clientApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import css from "./AuthNavigation.module.css";

export default function AuthNavigation() {
  const { isAuthenticated, user, clearAuth } = useAuthStore();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      clearAuth();
      toast.success("You have been logged out.");
      router.push("/sign-in");
    },
    onError: () => {
      toast.error("Logout failed. Please try again.");
    },
  });

  const handleLogout = () => {
    mutation.mutate();
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <li>
            <Link href="/profile" className={css.navigationLink}>
              Profile
            </Link>
          </li>
          <li className={css.navigationItem}>
            <p className={css.userEmail}>{user?.email}</p>
            <button
              onClick={handleLogout}
              className={css.logoutButton}
              disabled={mutation.isPending}
            >
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link href="/sign-in" className={css.navigationLink}>
              Login
            </Link>
          </li>
          <li>
            <Link href="/sign-up" className={css.navigationLink}>
              Sign up
            </Link>
          </li>
        </>
      )}
    </>
  );
}
