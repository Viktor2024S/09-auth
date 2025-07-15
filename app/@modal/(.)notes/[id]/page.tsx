import { Metadata } from "next";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/serverApi";
import ModalNoteDetailsClient from "./NotePreview.client";
import { Note } from "@/types/note";

interface InterceptedNotePageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
  params,
  searchParams,
}: InterceptedNotePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  void resolvedSearchParams;

  try {
    const note: Note = await fetchNoteById(id);
    return {
      title: `Modal: ${note.title}`,
      description: `Modal: ${note.content.substring(0, 160)}`,
    };
  } catch (_error) {
    void _error;
    return { title: "Modal Note not found" };
  }
}

export default async function InterceptedNotePage({
  params,
  searchParams,
}: InterceptedNotePageProps) {
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
    console.error("Failed to prefetch note for modal:", error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ModalNoteDetailsClient noteId={id} />
    </HydrationBoundary>
  );
}
