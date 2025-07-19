import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NoteHub: Sign up",
  description:
    "Register your free NoteHub profile and take control of your notes today.",
  openGraph: {
    type: "website",
    url: "https://09-auth-pi.vercel.app/sign-up",
    siteName: "NoteHub",
    title: "NoteHub: Sign up",
    description:
      "Register your free NoteHub profile and take control of your notes today.",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Sign up",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NoteHub: Sign up",
    description:
      "Register your free NoteHub profile and take control of your notes today.",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};
