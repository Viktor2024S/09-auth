// components/Header/Header.tsx
"use client";
import Link from "next/link";
import AuthNavigation from "../AuthNavigation/AuthNavigation";
import TagsMenu from "../TagsMenu/TagsMenu";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./Header.module.css";
import { AuthStore } from "@/lib/store/authStore";

// Винесіть функцію-селектор за межі компонента.
// Це гарантує, що функція створюється лише один раз, а не при кожному рендері.
const selectIsAuthenticated = (state: AuthStore) => ({
  isAuthenticated: state.isAuthenticated,
});

export default function Header() {
  const { isAuthenticated } = useAuthStore(selectIsAuthenticated);

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
            {isAuthenticated && (
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
