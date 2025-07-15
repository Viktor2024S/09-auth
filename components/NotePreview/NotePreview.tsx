"use client";

import { useQuery } from "@tanstack/react-query";
import { clientFetchNoteById } from "@/lib/api/clientApi";
import styles from "./NotePreview.module.css";

export type Note = {
  id: string;
  title: string;
  content: string;
  tag?: string;
  createdAt?: string;
};

interface NotePreviewProps {
  noteId: string;
}

const NotePreview = ({ noteId }: NotePreviewProps) => {
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

  if (isLoading) {
    return <div className={styles.container}>Завантаження нотатки...</div>;
  }

  if (isError) {
    return (
      <div className={styles.container}>
        Помилка завантаження нотатки: {error.message}
      </div>
    );
  }

  if (!note) {
    return <div className={styles.container}>Нотатку не знайдено.</div>;
  }

  const formattedDate = note.createdAt
    ? new Date(note.createdAt).toLocaleDateString("uk-UA", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Дата невідома";

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.header}>
          <h2>{note.title}</h2>
          {note.tag && <span className={styles.tag}>{note.tag}</span>}
        </div>
        <p className={styles.content}>{note.content}</p>
        <p className={styles.date}>Створено: {formattedDate}</p>
      </div>
    </div>
  );
};

export default NotePreview;
