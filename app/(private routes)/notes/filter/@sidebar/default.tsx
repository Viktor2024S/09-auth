import Link from "next/link";
import css from "./SidebarNotes.module.css";
import tags from "@/lib/tags";

const SidebarNotes = async () => {
  return (
    <ul id="tags-menu" className={css.menuList} role="menu">
      <li className={css.menuItem} role="menuitem">
        <Link href={`/notes/filter/All`} className={css.menuLink}>
          All
        </Link>
      </li>
      {tags.map((tag) => (
        <li className={css.menuItem} key={`${tag}`} role="menuitem">
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SidebarNotes;
