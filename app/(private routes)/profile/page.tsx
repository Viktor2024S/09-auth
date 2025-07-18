import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { fetchAuthenticatedUser } from "@/lib/api/serverApi";
import profileStyles from "./ProfilePage.module.css";

export async function generateProfilePageMetadata(): Promise<Metadata> {
  const currentUserData = await fetchAuthenticatedUser();

  return {
    title: `NoteHub — Profile: ${currentUserData.username}`,
    description: "Your personal profile page in NoteHub.",
    openGraph: {
      title: `Profile — ${currentUserData.username}`,
      description:
        "Check your username, email, and avatar in your NoteHub profile.",
      url: "https://09-auth-ruddy-nine.vercel.app/profile",
      images: [
        {
          url:
            currentUserData.avatar ||
            "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "User Avatar",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Profile — ${currentUserData.username}`,
      description: "Manage your personal profile details in NoteHub.",
      images: [
        currentUserData.avatar ||
          "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      ],
    },
  };
}

const UserProfileDisplayPage = async () => {
  const currentUserInfo = await fetchAuthenticatedUser();
  return (
    <main className={profileStyles.mainContent}>
      <div className={profileStyles.profileCard}>
        <div className={profileStyles.header}>
          <h1 className={profileStyles.formTitle}>Profile Page</h1>

          <Link
            href="/profile/edit"
            className={profileStyles.editProfileButton}
          >
            Edit Profile
          </Link>
        </div>
        <div className={profileStyles.avatarWrapper}>
          <Image
            src={
              currentUserInfo?.avatar ||
              "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"
            }
            alt="User Avatar"
            width={120}
            height={120}
            className={profileStyles.avatar}
            priority
          />
        </div>
        <div className={profileStyles.profileInfo}>
          <p>Username: {currentUserInfo?.username || "your_username"}</p>{" "}
          <p>
            Email: {currentUserInfo?.email || "your_email@example.com"}
          </p>{" "}
        </div>
      </div>
    </main>
  );
};

export default UserProfileDisplayPage;
