"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Image from "next/image";
import { getMyProfile, updateUser } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import Loader from "@/components/Loader/Loader";
import css from "./EditProfilePage.module.css";

export default function EditProfilePage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setUser } = useAuthStore();
  const [username, setUsername] = useState("");

  const { data: user, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getMyProfile,
  });

  useEffect(() => {
    if (user) setUsername(user.username);
  }, [user]);

  const mutation = useMutation({
    mutationFn: (newUsername: string) => updateUser({ username: newUsername }),
    onSuccess: (updatedUser) => {
      toast.success("Profile updated successfully!");
      setUser(updatedUser);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      router.push("/profile");
    },
    onError: (error) => {
      toast.error("Failed to update profile.");
      console.error(error);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user?.username === username) {
      toast("No changes made.");
      return;
    }
    mutation.mutate(username);
  };

  if (isLoading) return <Loader />;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        <Image
          src={user?.avatar || "/default-avatar.png"}
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
              disabled={mutation.isPending}
            />
          </div>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.back()}
              disabled={mutation.isPending}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={css.saveButton}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
