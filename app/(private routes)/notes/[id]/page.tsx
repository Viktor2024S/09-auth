import { Metadata } from "next";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/serverApi";
import NoteDetailsClient from "./NoteDetails.client";
import { Note } from "@/types/note";

interface NotePageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
  params,
  searchParams,
}: NotePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  void resolvedSearchParams;

  try {
    const note: Note = await fetchNoteById(id);
    return {
      title: note.title,
      description: note.content.substring(0, 160),
    };
  } catch (_error) {
    void _error;
    return { title: "Note not found" };
  }
}

export default async function NoteDetailsPage({
  params,
  searchParams,
}: NotePageProps) {
  const queryClient = new QueryClient();

  const resolvedParams = await params;
  const { id } = resolvedParams;

  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  void resolvedSearchParams;

  try {
    await queryClient.prefetchQuery({
      queryKey: ["note", id],
      queryFn: () => fetchNoteById(id),
    });
  } catch (error) {
    console.error("Failed to prefetch note:", error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient noteId={id} />
    </HydrationBoundary>
  );
}
