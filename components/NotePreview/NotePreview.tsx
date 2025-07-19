"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/clientApi";
import styles from "./NotePreview.module.css";

type Props = {
  noteId: string;
  onClose: () => void;
};

export default function NoteDetailsClient({ noteId, onClose }: Props) {
  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !note) return <p>Something went wrong.</p>;

  const created = note.createdAt || note.updatedAt;

  return (
    <section className={styles.container}>
      <div className={styles.item}>
        <header className={styles.header}>
          <h2>{note.title}</h2>
          <button className={styles.backBtn} onClick={onClose}>
            Go back
          </button>
        </header>
        <article className={styles.content}>{note.content}</article>
        <footer className={styles.date}>Created: {created}</footer>
      </div>
    </section>
  );
}
