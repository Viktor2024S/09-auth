"use client";

import { useAuthStore } from "@/lib/store/authStore";
import css from "./Header.module.css";
import Link from "next/link";
import { TagsMenu } from "@/components/TagsMenu/TagsMenu";
import AuthNavigation from "@/components/AuthNavigation/AuthNavigation";

const Header = () => {
  const { isAuthenticated } = useAuthStore();

  const homeHref = isAuthenticated ? "/profile" : "/";

  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home" className={css.headerLink}>
        NoteHub
      </Link>

      <nav aria-label="Main Navigation" className={css.navigation}>
        <ul className={css.navList}>
          <li className={css.navigationItem}>
            <Link href={homeHref} className={css.navigationLink}>
              Home
            </Link>
          </li>
          {isAuthenticated && (
            <li className={css.navigationItem}>
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
