import { Metadata } from "next";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/serverApi";
import NoteDetailsClient from "./NoteDetails.client";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id: idString } = await params;
  const parsedId = Number(idString);
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://your-vercel-app-url.app";
  const currentNoteUrl = `${baseUrl}/notes/${parsedId}`;

  try {
    const note = await fetchNoteById(parsedId);

    if (!note) {
      return {
        title: "Note Not Found",
        description: "The requested note could not be found.",
        openGraph: {
          title: "Note Not Found | NoteHub",
          description: "The requested note could not be found on NoteHub.",
          url: currentNoteUrl,
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
  } catch (error) {
    console.error(
      `Failed to fetch note for metadata (ID: ${parsedId}):`,
      error
    );
    return {
      title: "Note Not Found",
      description: "The requested note could not be found.",
      openGraph: {
        title: "Note Not Found | NoteHub",
        description: "The requested note could not be found on NoteHub.",
        url: currentNoteUrl,
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
}

export default async function NoteDetailsPage({ params }: PageProps) {
  const { id: idString } = await params;
  const parsedId = Number(idString);

  const queryClient = new QueryClient();

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
