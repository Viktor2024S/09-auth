"use client";

import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import { NoteTagsDropdownMenu } from "@/components/TagsMenu/TagsMenu";
import AuthenticationNavbar from "@/components/AuthNavigation/AuthNavigation";
import headerStyles from "./Header.module.css";

const AppNavigationBar = () => {
  const { isAuthenticated: isUserAuthenticated } = useAuthStore();

  const dynamicHomeLink = isUserAuthenticated ? "/profile" : "/";

  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.container}>
        <Link href="/" aria-label="Home" className={headerStyles.logo}>
          NoteHub
        </Link>

        <nav aria-label="Main Navigation" className={headerStyles.navigation}>
          <ul className={headerStyles.navigation}>
            <li className={headerStyles.navigationItem}>
              <Link href={dynamicHomeLink} className={headerStyles.link}>
                Home
              </Link>
            </li>
            {isUserAuthenticated && (
              <li className={headerStyles.navigationItem}>
                <NoteTagsDropdownMenu />
              </li>
            )}
            <li className={headerStyles.navigationItem}>
              <AuthenticationNavbar />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default AppNavigationBar;
