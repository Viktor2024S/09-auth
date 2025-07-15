import InterceptedModal from "@/components/Modal/Modal";
import NoteDetails from "@/components/NotePreview/NotePreview";
import { fetchNoteById } from "@/lib/api/serverApi";
import { QueryClient, dehydrate } from "@tanstack/react-query";

interface InterceptedNotePageProps {
  params: { id: string };
}

export default async function InterceptedNotePage({
  params,
}: InterceptedNotePageProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["note", id],
      queryFn: () => fetchNoteById(id),
    });
  } catch (error) {
    console.error("Failed to prefetch note details:", error);

    return null;
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <InterceptedModal dehydratedState={dehydratedState}>
      <NoteDetails noteId={id} />
    </InterceptedModal>
  );
}
