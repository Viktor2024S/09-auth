import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/serverApi";
import NotePreviewClient from "./NotePreview.client";

export default async function InterceptedNotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const parsedId = Number(id);
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["note", parsedId],
      queryFn: () => fetchNoteById(parsedId),
    });
  } catch (error) {}

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient noteId={parsedId} />
    </HydrationBoundary>
  );
}
