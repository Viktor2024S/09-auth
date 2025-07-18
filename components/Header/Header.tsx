import Link from "next/link";
import AuthNavigation from "@/components/AuthNavigation/AuthNavigation";
import css from "./Header.module.css";

const Header = () => {
  return (
    <header className={css.header}>
      <div className={`${css.container} ${css.headerContainer}`}>
        <Link href="/" className={css.logo}>
          NoteHub
        </Link>
        <nav>
          <AuthNavigation />
        </nav>
      </div>
    </header>
  );
};

export default Header;
