import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { serverFetchCurrentUser } from "@/lib/api/serverApi";
import css from "./page.module.css";
import { redirect } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const user = await serverFetchCurrentUser();
    return {
      title: `${user.username}'s Profile`,
      description: `Profile page for user ${user.username}.`,
    };
  } catch (error) {
    console.error("Failed to generate metadata for profile page:", error);
    return {
      title: "Profile",
      description: "User profile page.",
    };
  }
}

export default async function ProfilePage() {
  let user;
  try {
    user = await serverFetchCurrentUser();
  } catch (error) {
    console.error(
      "Failed to fetch current user, redirecting to sign-in:",
      error
    );
    redirect("/sign-in");
  }

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
            src={user?.avatar || "/default-avatar.png"}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user?.username}</p>
          <p>Email: {user?.email}</p>
        </div>
      </div>
    </main>
  );
}
