import type { Metadata } from "next";
import { getUserFromServer } from "@/lib/api/serverApi";
import Image from "next/image";
import Link from "next/link";
import styles from "./ProfilePage.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const user = await getUserFromServer();

  const avatarUrl =
    user.avatar || "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg";

  return {
    title: `NoteHub — Profile: ${user.username}`,
    description: "Your personal profile page in NoteHub.",
    openGraph: {
      title: `Profile — ${user.username}`,
      description:
        "Check your username, email, and avatar in your NoteHub profile.",
      url: "https://09-auth-pi.vercel.app/profile",
      images: [
        {
          url: avatarUrl,
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
      images: [avatarUrl],
    },
  };
}

const ProfilePage = async () => {
  const user = await getUserFromServer();

  const avatar =
    user?.avatar ||
    "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg";
  const username = user?.username || "your_username";
  const email = user?.email || "your_email@example.com";

  return (
    <main className={styles.mainContent}>
      <section className={styles.profileCard}>
        <header className={styles.header}>
          <h1 className={styles.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={styles.editProfileButton}>
            Edit Profile
          </Link>
        </header>

        <figure className={styles.avatarWrapper}>
          <Image
            src={avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={styles.avatar}
            priority
          />
        </figure>

        <section className={styles.profileInfo}>
          <p>
            <strong>Username:</strong> {username}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
        </section>
      </section>
    </main>
  );
};

export default ProfilePage;
