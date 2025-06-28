import Modal from "@/components/Modal/Modal";
import NotePreview from "@/components/NotePreview/NotePreview";
import { fetchNoteById } from "@/lib/api";

interface InterceptedNotePageProps {
  params: { id: string };
}

export default async function InterceptedNotePage({
  params,
}: InterceptedNotePageProps) {
  const id = Number(params.id);
  const note = await fetchNoteById(id);

  return (
    <Modal>
      <NotePreview note={note} />
    </Modal>
  );
}
