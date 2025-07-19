"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import tags from "@/lib/tags";
import styles from "./TagsMenu.module.css";

export const TagsMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggle = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    const onKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      window.addEventListener("keydown", onKeyPress);
    }

    return () => {
      window.removeEventListener("keydown", onKeyPress);
    };
  }, [menuOpen]);

  return (
    <div className={styles.menuContainer}>
      <button
        className={styles.menuButton}
        onClick={handleToggle}
        aria-haspopup="true"
        aria-controls="tags-menu"
        aria-expanded={menuOpen}
      >
        Notes ▾
      </button>

      {menuOpen && (
        <ul id="tags-menu" className={styles.menuList} role="menu">
          <li className={styles.menuItem} role="menuitem">
            <Link
              href="/notes/filter/All"
              className={styles.menuLink}
              onClick={handleToggle}
            >
              All
            </Link>
          </li>

          {tags.map((tagName) => (
            <li key={tagName} className={styles.menuItem} role="menuitem">
              <Link
                href={`/notes/filter/${tagName}`}
                className={styles.menuLink}
                onClick={handleToggle}
              >
                {tagName}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
