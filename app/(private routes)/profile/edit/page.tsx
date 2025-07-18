"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { fetchCurrentUser, updateUser } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { User } from "@/types/user";
import css from "./page.module.css";
import { AxiosError } from "axios";

export default function EditProfilePage() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await fetchCurrentUser();
        setCurrentUser(user);
        setUsername(user.username);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch current user for edit profile:", error);
        router.push("/sign-in");
      }
    };
    loadUser();
  }, [router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!currentUser) return;

    try {
      const updatedUser = await updateUser({ username });
      setUser(updatedUser);
      router.push("/profile");
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      console.error(
        axiosError.response?.data?.message || "Failed to update profile."
      );
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (isLoading || !currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        <Image
          src={currentUser.avatar || "/default-avatar.png"}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />
        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <p>Email: {currentUser.email}</p>
          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
