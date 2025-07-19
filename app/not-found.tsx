import styles from "./NotFound.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found — NoteHub",
  description:
    "Sorry, the page you are looking for does not exist. Explore other features and notes at NoteHub.",
  openGraph: {
    type: "website",
    url: "https://09-auth-pi.vercel.app/not-found",
    title: "Page Not Found — NoteHub",
    description:
      "This page could not be found. Browse NoteHub to manage and organize your notes effortlessly.",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Page Not Found - NoteHub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Page Not Found — NoteHub",
    description:
      "Sorry, the page you are trying to access doesn't exist. Visit NoteHub to keep track of your notes.",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
  themeColor: "#408de4ff",
};

const NotFound = () => {
  return (
    <section className={styles.container}>
      <header>
        <h2 className={styles.title}>404 — Page not found</h2>
      </header>
      <article>
        <p className={styles.description}>
          Sorry, the page you are trying to access does not exist.
        </p>
      </article>
    </section>
  );
};

export default NotFound;
