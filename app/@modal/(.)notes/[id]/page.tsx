import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api";
import NotePreviewClient from "./NotePreview.client";

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
      <NotePreviewClient note={note} />
    </Modal>
  );
}
