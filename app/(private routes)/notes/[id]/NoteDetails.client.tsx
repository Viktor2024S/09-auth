"use client";
import { useQuery } from "@tanstack/react-query";
import { clientFetchNoteById } from "@/lib/api/clientApi";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import css from "./NoteDetails.module.css";

interface NoteDetailsClientProps {
  noteId: number;
}

export default function NoteDetailsClient({ noteId }: NoteDetailsClientProps) {
  const {
    data: note,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => clientFetchNoteById(noteId),
    enabled: !!noteId,
  });

  if (isLoading) return <Loader />;
  if (isError)
    return <ErrorMessage message={error?.message || "Something went wrong."} />; //
  if (!note) return <ErrorMessage message="Note not found." />;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2 className={css.title}>{note.title}</h2>
          {/*  "Edit note" */}
          {/* <button className={css.editBtn}>Edit note</button> */}
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>
          Created at: {new Date(note.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
