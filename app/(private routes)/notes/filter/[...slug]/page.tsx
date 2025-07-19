import NotesClient from "./Notes.client";
import type { Metadata } from "next";
import { fetchNotesServer } from "@/lib/api/serverApi";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const filterCategory = slug[0];

  return {
    title: `Category: ${filterCategory}`,
    description: `View all notes filtered by category: ${filterCategory}.`,
    openGraph: {
      title: `Notes filtered by: ${filterCategory}`,
      description: `Browse all notes in the "${filterCategory}" category.`,
      url: `https://09-auth-pi.vercel.app/notes/filter/${slug.join("/")}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://placehold.co/1200x630",
          width: 1200,
          height: 630,
          alt: filterCategory,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `Notes filtered by: ${filterCategory}`,
      description: `Browse all notes in the "${filterCategory}" category.`,
      images: ["https://ac.goit.global/fullstack/react/og-meta.jpg"],
    },
  };
}

const NotesByCategory = async ({ params }: Props) => {
  const { slug } = await params;
  const categoryParam = slug[0]?.toLowerCase() === "all" ? undefined : slug[0];
  const fetchedNotes = await fetchNotesServer("", 1, 10, categoryParam);

  return (
    <section>
      <NotesClient
        initialData={fetchedNotes}
        activeTag={categoryParam ?? "All"}
      />
    </section>
  );
};

export default NotesByCategory;
