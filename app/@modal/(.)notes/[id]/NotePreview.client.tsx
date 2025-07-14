"use client";
import { useQuery } from "@tanstack/react-query";
import { clientFetchNoteById } from "@/lib/api/clientApi";
import Modal from "@/components/Modal/Modal";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import css from "./NotePreview.module.css";

export default function NotePreviewClient({ noteId }: { noteId: number }) {
  const {
    data: note,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => clientFetchNoteById(noteId),
  });

  const content = () => {
    if (isLoading) return <Loader />;
    if (isError) return <ErrorMessage message={error.message} />;
    if (!note) return <ErrorMessage message="Note not found." />;
    return (
      <article className={css.note}>
        <h2 className={css.title}>{note.title}</h2>
        <p className={css.tag}>{note.tag}</p>
        <p>{note.content}</p>
      </article>
    );
  };

  return <Modal>{content()}</Modal>;
}
