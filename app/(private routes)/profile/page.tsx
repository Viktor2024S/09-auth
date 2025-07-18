"use client";

import Link from "next/link";
// import Image from "next/image";
import css from "./ProfilePage.module.css";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { fetchCurrentUser } from "@/lib/api/clientApi";
export default function ProfilePage() {
  const { user: authUser, setUser, clearIsAuthenticated } = useAuthStore();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(authUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserProfile = async () => {
      if (!authUser) {
        try {
          const fetchedUser = await fetchCurrentUser();
          setUser(fetchedUser);
          setCurrentUser(fetchedUser);
        } catch (error) {
          console.error(
            "Failed to fetch current user, redirecting to sign-in:",
            error
          );
          clearIsAuthenticated();
          router.push("/sign-in");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    getUserProfile();
  }, [authUser, setUser, clearIsAuthenticated, router]);

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (!currentUser) {
    router.push("/sign-in");
    return null;
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Profile Page</h1>
        <div className={css.header}>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        {/* <div className={css.avatarWrapper}>
          <Image
            src={currentUser?.avatar || "/default-avatar.png"}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div> */}
        <div className={css.profileInfo}>
          <p>Username: {currentUser?.username}</p>
          <p>Email: {currentUser?.email}</p>
        </div>
      </div>
    </main>
  );
}
