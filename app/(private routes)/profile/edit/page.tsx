"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuthStore } from "@/lib/store/authStore";
import { updateUser, uploadImage } from "@/lib/api/clientApi";
import { UserUpdate } from "@/types/user";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

export default function EditProfilePage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { user, setUser } = useAuthStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));

  if (!user) {
    return <div>Loading user data...</div>;
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);

    const formValues: UserUpdate = {
      username: formData.get("username") as string,
      email: formData.get("email") as string,
    };

    try {
      let currentAvatarUrl = user.avatar;

      if (imageFile) {
        const uploadResponse = await uploadImage(imageFile);
        currentAvatarUrl = uploadResponse.photoUrl;
      }

      const updatedUser = await updateUser({
        ...formValues,
        avatar: currentAvatarUrl,
      });

      if (updatedUser) {
        setUser(updatedUser);
        toast.success("Profile updated successfully!");
        router.push("/profile");
      } else {
        setError("Failed to update profile.");
        toast.error("Profile update failed.");
      }
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      console.error("Profile update error:", axiosError);
      setError(
        axiosError.response?.data?.message || "Failed to update profile."
      );
      toast.error(
        axiosError.response?.data?.message || "Profile update failed."
      );
    }
  };

  return (
    <main>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            defaultValue={user.username || ""}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            defaultValue={user.email || ""}
            required
          />
        </div>
        <div>
          <label htmlFor="image">Profile Image</label>
          <input
            id="image"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />

          {user.avatar && (
            <Image src={user.avatar} alt="Profile" width={100} height={100} />
          )}
        </div>
        <div>
          <button type="submit">Save Changes</button>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </main>
  );
}
