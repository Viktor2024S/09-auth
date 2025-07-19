"use client";

import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import { TagsMenu } from "@/components/TagsMenu/TagsMenu";
import AuthNavigation from "@/components/AuthNavigation/AuthNavigation";
import styles from "./Header.module.css";

const Header = () => {
  const authStatus = useAuthStore((state) => state.isAuthenticated);

  const landingPage = authStatus ? "/profile" : "/";

  return (
    <header className={styles.header}>
      <Link href="/" aria-label="Home" className={styles.headerLink}>
        NoteHub
      </Link>
      <nav className={styles.navigation} aria-label="Main Navigation">
        <ul className={styles.navList}>
          <li className={styles.navigationItem}>
            <Link href={landingPage} className={styles.navigationLink}>
              Home
            </Link>
          </li>
          {authStatus && (
            <li className={styles.navigationItem}>
              <TagsMenu />
            </li>
          )}
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
