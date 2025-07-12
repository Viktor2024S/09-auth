"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchNoteById } from "@/lib/api/api";
import Modal from "@/components/Modal/Modal";
import Loader from "@/components/Loader/Loader";
import { Note } from "@/types/note";
import css from "@/components/NotePreview/NotePreview.module.css";

function NoteDetails({ note }: { note: Note }) {
  return (
    <div className={css.container}>
      <div className={css.header}>
        <h2 className={css.title}>{note.title}</h2>
        {note.tag && <span className={css.tag}>{note.tag}</span>}
      </div>
      <p className={css.content}>{note.content}</p>
      <p className={css.date}>
        Created at: {new Date(note.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}

export default function NotePreviewClient() {
  const params = useParams();
  const id = Number(params.id);

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
    refetchOnMount: false,
  });

  return (
    <Modal>
      {isLoading && <Loader />}
      {isError && <p>Could not fetch note details.</p>}
      {note && <NoteDetails note={note} />}
    </Modal>
  );
}
