import Link from "next/link";
//
import css from "./LayoutNotes.module.css"; //==---???
//

export default function NotFound() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page Not Found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/" className={css.link}>
        Go back to Home
      </Link>
    </div>
  );
}
