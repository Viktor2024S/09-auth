"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuthStore } from "@/lib/store/authStore";
import { modifyUserProfile } from "@/lib/api/clientApi";
import pageStyles from "./EditProfilePage.module.css";

const UserProfileEditForm = () => {
  const navigationRouter = useRouter();
  const currentUserData = useAuthStore((state) => state.user);
  const setUserData = useAuthStore((state) => state.setUser);

  const handleProfileUpdateSubmission = async (submissionData: FormData) => {
    const newUsernameValue = submissionData.get("username") as string;

    try {
      const updatedUserInfo = await modifyUserProfile({
        username: newUsernameValue,
      });
      setUserData(updatedUserInfo);
      navigationRouter.push("/profile");
    } catch (updateError) {
      console.error("Failed to update profile:", updateError);
    }
  };

  return (
    <main className={pageStyles.mainContent}>
      <div className={pageStyles.profileCard}>
        <h1 className={pageStyles.formTitle}>Edit Profile</h1>

        <Image
          src={
            currentUserData?.avatar ||
            "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"
          }
          alt="User Avatar"
          width={120}
          height={120}
          className={pageStyles.avatar}
          priority
        />
        <form
          action={handleProfileUpdateSubmission}
          className={pageStyles.profileInfo}
        >
          <div className={pageStyles.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              name="username"
              type="text"
              className={pageStyles.input}
              defaultValue={currentUserData?.username || ""}
              required
            />
          </div>
          <p>Email: {currentUserData?.email || "user_email@example.com"}</p>
          <div className={pageStyles.actions}>
            <button type="submit" className={pageStyles.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={pageStyles.cancelButton}
              onClick={() => navigationRouter.push("/profile")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default UserProfileEditForm;
