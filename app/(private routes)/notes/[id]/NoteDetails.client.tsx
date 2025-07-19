"use client";

import { useQuery } from "@tanstack/react-query";
import styles from "./NoteDetails.module.css";
import { fetchNoteById } from "@/lib/api/clientApi";

interface NoteDetailsClientProps {
  noteId: string;
}

const NoteDetailsClient = ({ noteId }: NoteDetailsClientProps) => {
  const {
    data: noteData,
    isLoading: pending,
    error: fetchError,
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  if (pending) {
    return <p>Loading, please wait...</p>;
  }

  if (fetchError || !noteData) {
    return <p>Something went wrong.</p>;
  }

  const displayDate = noteData.createdAt ?? noteData.updatedAt;

  return (
    <section className={styles.container}>
      <article className={styles.item}>
        <header className={styles.header}>
          <h2>{noteData.title}</h2>
          <button className={styles.editBtn}>Edit note</button>
        </header>
        <p className={styles.content}>{noteData.content}</p>
        <footer className={styles.date}>Created: {displayDate}</footer>
      </article>
    </section>
  );
};

export default NoteDetailsClient;
