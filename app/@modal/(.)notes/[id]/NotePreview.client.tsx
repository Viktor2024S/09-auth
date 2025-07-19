"use client";

import { Modal } from "@/components/Modal/Modal";
import NoteDetailsClient from "@/components/NotePreview/NotePreview";
import { useRouter } from "next/navigation";

interface PreviewClientProps {
  noteId: string;
}

const PreviewClient = ({ noteId }: PreviewClientProps) => {
  const router = useRouter();
  const onClose = () => {
    router.back();
  };

  return (
    <Modal onClose={onClose}>
      <NoteDetailsClient noteId={noteId} onClose={onClose} />
    </Modal>
  );
};

export default PreviewClient;
