import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import "modern-normalize/modern-normalize.css";
import "./globals.css";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: {
    template: "%s | NoteHub",
    default: "NoteHub - Your Personal Notes Manager",
  },
  description:
    "A simple and efficient application for managing your personal notes. Keep your thoughts organized and accessible.",
  openGraph: {
    title: "NoteHub - Your Personal Notes Manager",
    description: "Organize your thoughts, tasks, and ideas with NoteHub.",
    url: "https://08-zustand-pi-six.vercel.app/",
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

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable}`}>
      <body>
        <TanStackProvider>
          <Header />
          <main className="main-content">{children}</main>
          <Footer />
          {modal}
        </TanStackProvider>
      </body>
    </html>
  );
}
