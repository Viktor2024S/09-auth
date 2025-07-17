import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import AppNavigationBar from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import QueryClientWrapper from "@/components/TanStackProvider/TanStackProvider";
import ApplicationAuthenticator from "../components/AuthProvider/AuthProvider";
import "modern-normalize/modern-normalize.css";
import "./globals.css";

const mainAppFont = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const pageMetadata: Metadata = {
  title: "NoteHub — Smart Note-Taking App",
  description:
    "NoteHub is a modern web application for creating, editing, and organizing your notes effortlessly. Keep track of your ideas, reminders, and to-do lists in one secure, accessible place.",
  openGraph: {
    title: "NoteHub — Smart Note-Taking App",
    description:
      "Easily create, manage, and organize your notes online with NoteHub. A clean interface and powerful features designed to boost your productivity.",
    url: "https://09-auth-ruddy-nine.vercel.app/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub — app got notes",
      },
    ],
  },
  icons: {
    icon: "/title-web.ico",
  },
};

export default function ApplicationRootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mainAppFont.variable}`}>
        <QueryClientWrapper>
          <ApplicationAuthenticator>
            <AppNavigationBar />
            <main>
              {children}
              {modal}
            </main>
            <Footer />
          </ApplicationAuthenticator>
        </QueryClientWrapper>
      </body>
    </html>
  );
}
