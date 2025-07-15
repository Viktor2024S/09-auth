"use client";

import { useQuery } from "@tanstack/react-query";
import { clientFetchNoteById } from "@/lib/api/clientApi";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import css from "./NoteDetails.module.css";
import { Note } from "@/types/note";

interface NoteDetailsClientProps {
  noteId: string;
}

export default function NoteDetailsClient({ noteId }: NoteDetailsClientProps) {
  const {
    data: note,
    isLoading,
    isError,
    error,
  } = useQuery<Note, Error>({
    queryKey: ["note", noteId],
    queryFn: () => clientFetchNoteById(noteId),
    enabled: !!noteId,
  });

  if (isLoading) return <Loader />;
  if (isError)
    return <ErrorMessage message={error?.message || "An error occurred."} />; //
  if (!note) return <ErrorMessage message="Note details not available." />;

  return (
    <div className={css.container}>
      <h1 className={css.title}>{note.title}</h1>
      <p className={css.tag}>{note.tag}</p>
      <p className={css.content}>{note.content}</p>
    </div>
  );
}
