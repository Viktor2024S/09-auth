import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NoteHub: Sign in",
  description: "Access your NoteHub space and control your notes effortlessly.",
  openGraph: {
    type: "website",
    url: "https://09-auth-pi.vercel.app/sign-in",
    siteName: "NoteHub",
    title: "NoteHub: Sign in",
    description:
      "Access your NoteHub space and control your notes effortlessly.",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Sign in",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NoteHub: Sign in",
    description:
      "Access your NoteHub space and control your notes effortlessly.",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};
