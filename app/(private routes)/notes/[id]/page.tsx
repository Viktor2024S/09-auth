import NoteDetailsClient from "./NoteDetails.client";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { Metadata } from "next";
import { fetchNoteByIdServer } from "@/lib/api/serverApi";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const noteData = await fetchNoteByIdServer(id);

  return {
    title: `Note: ${noteData.title}`,
    description: noteData.content.substring(0, 30),

    openGraph: {
      title: `Note: ${noteData.title}`,
      description: noteData.content.substring(0, 100),

      url: `https://09-auth-ruddy-nine.vercel.app/notes/${id}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://placehold.co/1200x630",
          width: 1200,
          height: 630,
          alt: noteData.title,
        },
      ],
      type: "article",
    },

    twitter: {
      card: "summary_large_image",
      title: noteData.title,
      description: noteData.content.slice(0, 3),
      images: ["https://ac.goit.global/fullstack/react/og-meta.jpg"],
    },
  };
}

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;
  const client = new QueryClient();

  await client.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteByIdServer(id),
  });

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <NoteDetailsClient noteId={id} />
    </HydrationBoundary>
  );
};

export default NoteDetails;
