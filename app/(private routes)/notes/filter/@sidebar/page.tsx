import Link from "next/link";
import { Tag } from "@/types/note";
import css from "./Sidebar.module.css";

const tags: (Tag | "All")[] = [
  "All",
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
];

export default function SidebarPage() {
  return (
    <div className={css.sidebarContainer}>
      <h2 className={css.title}>Filter by Tag</h2>
      <ul className={css.menuList}>
        {tags.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag === "All" ? "All notes" : tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
