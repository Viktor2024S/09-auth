import { Metadata } from "next";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/serverApi";
import NoteDetailsClient from "./NoteDetails.client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  try {
    const note = await fetchNoteById(Number(id));
    return {
      title: note.title,
      description: note.content.substring(0, 160),
    };
  } catch (error) {
    return { title: "Note not found" };
  }
}

export default async function NoteDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const queryClient = new QueryClient();
  const { id } = await params;
  const parsedId = Number(id);

  try {
    await queryClient.prefetchQuery({
      queryKey: ["note", parsedId],
      queryFn: () => fetchNoteById(parsedId),
    });
  } catch (error) {
    console.error("Failed to prefetch note:", error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient noteId={parsedId} />
    </HydrationBoundary>
  );
}
