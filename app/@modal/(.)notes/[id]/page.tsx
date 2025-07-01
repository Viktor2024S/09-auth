import Modal from "@/components/Modal/Modal";
import NotePreview from "@/components/NotePreview/NotePreview";
import { fetchNoteById } from "@/lib/api";

export default async function InterceptedNotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const parsedId = Number(id);
  const note = await fetchNoteById(parsedId);

  return (
    <Modal>
      <NotePreview note={note} />
    </Modal>
  );
}
