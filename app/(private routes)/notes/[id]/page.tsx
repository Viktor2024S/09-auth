import NoteDetailsClient from "./NoteDetails.client";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Metadata } from "next";
import { fetchNoteByIdServer } from "@/lib/api/serverApi";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteByIdServer(id);
  return {
    title: `Note: ${note.title}`,
    description: note.content.slice(0, 30),
    openGraph: {
      title: `Note: ${note.title}`,
      description: note.content.slice(0, 100),
      url: `https://09-auth-ruddy-nine.vercel.app/notes/${id}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://placehold.co/1200x630",
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${note.title}`,
      description: note.content.slice(0, 3),
      images: ["https://ac.goit.global/fullstack/react/og-meta.jpg"],
    },
  };
}

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteByIdServer(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient noteId={id} />
    </HydrationBoundary>
  );
};

export default NoteDetails;
