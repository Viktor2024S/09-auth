import type { Metadata } from "next";
import { getUserFromServer } from "@/lib/api/serverApi";
import Image from "next/image";
import css from "./ProfilePage.module.css";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  const user = await getUserFromServer();

  return {
    title: `NoteHub — Profile: ${user.username}`,
    description: "Your personal profile page in NoteHub.",
    openGraph: {
      title: `Profile — ${user.username}`,
      description:
        "Check your username, email, and avatar in your NoteHub profile.",
      url: "https://09-auth-ruddy-nine.vercel.app/profile",
      images: [
        {
          url:
            user.avatar ||
            "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "User Avatar",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Profile — ${user.username}`,
      description: "Manage your personal profile details in NoteHub.",
      images: [
        user.avatar ||
          "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      ],
    },
  };
}

const ProfilePage = async () => {
  const user = await getUserFromServer();
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={
              user?.avatar ||
              "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"
            }
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
            priority
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user?.username || "your_username"}</p>
          <p>Email: {user?.email || "your_email@example.com"}</p>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
