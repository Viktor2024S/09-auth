import css from "./Home.module.css";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notehub - not found",
  description: "Sorry, the page you are looking for does not exist.",
  openGraph: {
    title: "Notehub - not found",
    description: "Sorry, the page you are looking for does not exist.",
    url: "https://09-auth-pi.vercel.app/notes",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },
    ],
    type: "article",
  },
};

export default function NotFound() {
  return (
    <div className={css.notfound}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/" className={css.link}>
        Go back to Home
      </Link>
    </div>
  );
}
