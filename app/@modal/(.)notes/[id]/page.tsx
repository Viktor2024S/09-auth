import { fetchNoteById } from "@/lib/api/clientApi";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import PreviewClient from "./NotePreview.client";

interface Props {
  params: Promise<{ id: string }>;
}

const NoteDetailsModal = async ({ params }: Props) => {
  const { id } = await params;

  const qc = new QueryClient();

  await qc.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  const dehydrated = dehydrate(qc);

  return (
    <HydrationBoundary state={dehydrated}>
      <PreviewClient noteId={id} />
    </HydrationBoundary>
  );
};

export default NoteDetailsModal;
