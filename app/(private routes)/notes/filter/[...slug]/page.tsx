import { Metadata } from "next";
import { serverFetchNotes } from "@/lib/api/serverApi"; // Переконайтеся, що fetchNotes тепер serverFetchNotes
import NotesClient from "./Notes.client";
import { Tag, isTagOrAll } from "@/types/note"; // Імпортуємо isTagOrAll

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tag: Tag | "All" = slug?.[0] && isTagOrAll(slug[0]) ? slug[0] : "All";
  const pageTitle = tag === "All" ? "All Notes" : `Notes with tag: ${tag}`;
  const pageDescription = `Browse and manage your notes. Current filter: ${tag}.`;

  const baseUrl = "https://09-auth-pi.vercel.app";
  const currentUrl = `${baseUrl}/notes/filter/${tag}`;

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: currentUrl,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub Notes Filter",
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
}

export default async function NotesFilterPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const tag: Tag | "All" = slug?.[0] && isTagOrAll(slug[0]) ? slug[0] : "All";
  const currentPage = 1;
  const initialSearchQuery = "";

  const initialData = await serverFetchNotes(
    currentPage,
    initialSearchQuery,
    tag
  );

  return (
    <NotesClient
      initialPage={currentPage}
      initialTag={tag}
      initialSearchQuery={initialSearchQuery}
      initialData={initialData}
    />
  );
}
