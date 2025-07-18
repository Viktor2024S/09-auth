import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { serverFetchNoteById } from "@/lib/api/serverApi";
import ModalNoteDetailsClient from "./NotePreview.client";
// import { Note } from "@/types/note";

interface ModalNotePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ModalNotePage({ params }: ModalNotePageProps) {
  const queryClient = new QueryClient();
  const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => serverFetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ModalNoteDetailsClient noteId={id} />
    </HydrationBoundary>
  );
}
