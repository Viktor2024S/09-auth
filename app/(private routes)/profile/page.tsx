// !
import Image from "next/image";
import Link from "next/link";
import { getUserFromServer } from "@/lib/api/serverApi";
import styles from "./ProfilePage.module.css";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const currentUser = await getUserFromServer();

  return {
    title: `NoteHub — Profile: ${currentUser.username}`,
    description: "Your personal profile page in NoteHub.",
    openGraph: {
      title: `Profile — ${currentUser.username}`,
      description:
        "Check your username, email, and avatar in your NoteHub profile.",
      url: "https://09-auth-ruddy-nine.vercel.app/profile",
      images: [
        {
          url:
            currentUser.avatar ||
            "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "User Avatar",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Profile — ${currentUser.username}`,
      description: "Manage your personal profile details in NoteHub.",
      images: [
        currentUser.avatar ||
          "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      ],
    },
  };
}
const ProfilePage = async () => {
  const currentUser = await getUserFromServer();
  return (
    <main className={styles.mainContent}>
      <section className={styles.profileCard}>
        <header className={styles.header}>
          <h1 className={styles.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={styles.editProfileButton}>
            Edit Profile
          </Link>
        </header>
        <div className={styles.avatarWrapper}>
          <Image
            src={
              currentUser?.avatar ||
              "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"
            }
            alt="User Avatar"
            width={120}
            height={120}
            className={styles.avatar}
            priority
          />
        </div>
        <section className={styles.profileInfo}>
          <p>Username: {currentUser?.username || "your_username"}</p>
          <p>Email: {currentUser?.email || "your_email@example.com"}</p>
        </section>
      </section>
    </main>
  );
};

export default ProfilePage;
