import { Metadata } from "next";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/api";
import NoteDetailsClient from "./NoteDetails.client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  let note;
  try {
    note = await fetchNoteById(Number(id));
  } catch (error) {
    console.error(`Failed to fetch note for metadata for ID: ${id}`, error);
    return {
      title: "Note Not Found",
      description: "The requested note could not be found.",
      openGraph: {
        title: "Note Not Found | NoteHub",
        description: "The requested note could not be found on NoteHub.",
        url: `https://08-zustand-pi-six.vercel.app/notes/${id}`,
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            width: 1200,
            height: 630,
            alt: "NoteHub Default Image",
          },
        ],
        locale: "en_US",
        type: "website",
      },
    };
  }

  const baseUrl = "https://08-zustand-pi-six.vercel.app";
  const currentNoteUrl = `${baseUrl}/notes/${id}`;

  return {
    title: note.title,
    description: note.content.substring(0, 160),
    openGraph: {
      title: note.title,
      description: note.content.substring(0, 160),
      url: currentNoteUrl,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `NoteHub - ${note.title}`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
}

export default async function NoteDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const queryClient = new QueryClient();
  const { id } = await params;
  const parsedId = Number(id);

  await queryClient.prefetchQuery({
    queryKey: ["note", parsedId],
    queryFn: () => fetchNoteById(parsedId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
