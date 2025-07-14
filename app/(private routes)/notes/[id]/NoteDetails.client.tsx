"use client";
import { useQuery } from "@tanstack/react-query";
import { clientFetchNoteById } from "@/lib/api/clientApi";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import css from "./NoteDetails.module.css";

export default function NoteDetailsClient({ noteId }: { noteId: number }) {
  const {
    data: note,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => clientFetchNoteById(noteId),
  });

  if (isLoading) return <Loader />;
  if (isError) return <ErrorMessage message={error.message} />;
  if (!note) return <ErrorMessage message="Note not found." />;

  return (
    <article className={css.note}>
      <h1 className={css.title}>{note.title}</h1>
      <p className={css.tag}>{note.tag}</p>
      <div className={css.content}>
        <p>{note.content}</p>
      </div>
    </article>
  );
}
