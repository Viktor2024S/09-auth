// components/Header/Header.tsx
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
      {/* Use .container to wrap content for flex layout */}
      <div className={headerStyles.container}>
        {/* Apply .logo class for the NoteHub link */}
        <Link href="/" aria-label="Home" className={headerStyles.logo}>
          NoteHub
        </Link>

        <nav aria-label="Main Navigation" className={headerStyles.navigation}>
          {/* Apply .navigation class to the <ul> element for list styling */}
          <ul className={headerStyles.navigation}>
            {" "}
            {/* Use .navigation for the ul to apply list-style-type: none etc. */}
            <li className={headerStyles.navigationItem}>
              {" "}
              {/* Assuming .navigationItem will be added to CSS */}
              <Link
                href={dynamicHomeLink}
                className={headerStyles.link} // Apply .link class
              >
                Home
              </Link>
            </li>
            {isUserAuthenticated && (
              <li className={headerStyles.navigationItem}>
                <NoteTagsDropdownMenu />
              </li>
            )}
            {/* AuthenticationNavbar likely contains its own styling, ensure it works with .navigationItem or adjust */}
            <li className={headerStyles.navigationItem}>
              {" "}
              {/* Wrap AuthenticationNavbar in an li if it represents a nav item */}
              <AuthenticationNavbar />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default AppNavigationBar;
