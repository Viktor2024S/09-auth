"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuthStore } from "@/lib/store/authStore";
import { updateUser, uploadImage } from "@/lib/api/clientApi";
import { UserUpdate } from "@/types/user";
import toast from "react-hot-toast";
import css from "./EditProfilePage.module.css";
import { AxiosError } from "axios";

export default function ProfileEditPage() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const [username, setUsername] = useState(user?.username || "");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewAvatarUrl, setPreviewAvatarUrl] = useState<string | null>(
    user?.avatar || null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setUsername(user.username || "");
      setPreviewAvatarUrl(user.avatar || null);
    }
  }, [user]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setAvatarFile(file);
      setPreviewAvatarUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      let finalAvatarUrl: string | null | undefined = user?.avatar || null;

      if (avatarFile) {
        const uploadResponse = await uploadImage(avatarFile);
        finalAvatarUrl = uploadResponse.photoUrl;
        if (!finalAvatarUrl) {
          throw new Error("Failed to upload image or retrieve URL.");
        }
      } else if (previewAvatarUrl === null && user?.avatar) {
        finalAvatarUrl = null;
      }

      const updatedUserData: UserUpdate = { username: username.trim() };

      if (finalAvatarUrl !== undefined) {
        updatedUserData.avatar = finalAvatarUrl;
      }

      const updatedUser = await updateUser(updatedUserData);
      setUser(updatedUser);
      toast.success("Profile updated successfully!");
      router.push("/profile");
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      console.error("Failed to update profile:", axiosError);
      setError(
        axiosError.response?.data?.message || "Failed to update profile."
      );
      toast.error(
        axiosError.response?.data?.message || "Failed to update profile."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        <form className={css.form} onSubmit={handleSubmit}>
          <div className={css.formGroup}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="avatar">Avatar</label>
            <input
              id="avatar"
              type="file"
              name="avatar"
              accept="image/*"
              className={css.fileInput}
              onChange={handleFileChange}
            />
            {previewAvatarUrl && (
              <div className={css.avatarPreviewWrapper}>
                <Image
                  src={previewAvatarUrl}
                  alt="Avatar Preview"
                  width={100}
                  height={100}
                  className={css.avatarPreview}
                  priority={true}
                />
              </div>
            )}
            {/* Кнопка для видалення аватара, якщо потрібно, додається тут */}
            {previewAvatarUrl && user?.avatar && !avatarFile && (
              <button
                type="button"
                className={css.clearAvatarButton}
                onClick={() => {
                  setAvatarFile(null);
                  setPreviewAvatarUrl(null);
                }}
              >
                Clear Avatar
              </button>
            )}
          </div>

          {error && <p className={css.error}>{error}</p>}

          <div className={css.actions}>
            <button
              type="submit"
              className={css.submitButton}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.push("/profile")}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
