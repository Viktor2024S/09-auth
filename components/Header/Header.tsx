"use client";
import Link from "next/link";
import AuthNavigation from "../AuthNavigation/AuthNavigation";
import TagsMenu from "../TagsMenu/TagsMenu";
import { useAuthStore } from "@/components/AuthStoreProvider/AuthStoreProvider";
import css from "./Header.module.css";
import { AuthStoreType } from "@/lib/store/authStore";

export default function Header() {
  const { isAuth } = useAuthStore((state: AuthStoreType) => ({
    isAuth: state.isAuth,
  }));

  return (
    <header className={css.header}>
      <div className={css.container}>
        <Link href="/" aria-label="Home" className={css.logo}>
          NoteHub
        </Link>
        <nav aria-label="Main Navigation">
          <ul className={css.navigation}>
            <li>
              <Link href="/" className={css.link}>
                Home
              </Link>
            </li>
            {isAuth && (
              <li>
                <TagsMenu />
              </li>
            )}
            <AuthNavigation />
          </ul>
        </nav>
      </div>
    </header>
  );
}
