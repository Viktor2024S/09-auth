import { Metadata } from "next";

export const metadata: Metadata = {
  title: `NoteHub: Sign in`,
  description: "Sign in to your NoteHub account and manage your notes easily.",
  openGraph: {
    type: "website",
    url: "https://09-auth-pi.vercel.app/sign-in",
    title: "NoteHub: Sign in",
    description:
      "Sign in to your NoteHub account and manage your notes easily.",
    siteName: "NoteHub",
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
      "Sign in to your NoteHub account and manage your notes easily.",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};
