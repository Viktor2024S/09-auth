import { Metadata } from "next";
import Link from "next/link";
import css from "./Home.module.css";

// export const metadata: Metadata = {
//   title: "Page Not Found",
//   description: "Sorry, the page you are looking for does not exist.",
//   openGraph: {
//     title: "Page Not Found | NoteHub",
//     description: "This link leads to a page that doesn't exist on NoteHub.",
//   },
// };

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "Sorry, the page you are looking for does not exist.",
  openGraph: {
    title: "Page Not Found | NoteHub",
    description: "Organize your thoughts, tasks, and ideas with NoteHub.",
    url: "https://08-zustand-pi-six.vercel.app/404",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

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
