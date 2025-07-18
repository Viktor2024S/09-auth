"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import noteTagsData, { Tag } from "@/lib/tags";
import menuStyles from "./TagsMenu.module.css";

export const NoteTagsDropdownMenu = () => {
  const [isDropdownActive, setDropdownActive] = useState(false);
  const toggleDropdownState = () =>
    setDropdownActive((prevActive) => !prevActive);

  useEffect(() => {
    const handleKeyboardEscape = (keyboardEvent: KeyboardEvent) => {
      if (keyboardEvent.key === "Escape") {
        setDropdownActive(false);
      }
    };

    if (isDropdownActive) {
      document.addEventListener("keydown", handleKeyboardEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyboardEscape);
    };
  }, [isDropdownActive]);

  return (
    <div className={menuStyles.menuContainer}>
      <button
        className={menuStyles.menuButton}
        onClick={toggleDropdownState}
        aria-controls="tags-menu"
        aria-expanded={isDropdownActive}
        aria-haspopup="true"
      >
        Notes ▾
      </button>

      {isDropdownActive && (
        <ul id="tags-menu" className={menuStyles.menuList} role="menu">
          <li className={menuStyles.menuItem} role="menuitem">
            <Link
              href={`/notes/filter/All`}
              className={menuStyles.menuLink}
              onClick={toggleDropdownState}
            >
              All
            </Link>
          </li>
          {noteTagsData.map((currentTag: Tag) => (
            <li
              className={menuStyles.menuItem}
              key={currentTag}
              role="menuitem"
            >
              <Link
                href={`/notes/filter/${currentTag}`}
                className={menuStyles.menuLink}
                onClick={toggleDropdownState}
              >
                {currentTag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
