"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { clientFetchNoteById } from "@/lib/api/clientApi";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import css from "./NoteDetails.module.css";

export default function NoteDetailsClient() {
  const params = useParams();
  const id = params.id as string;

  const {
    data: note,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => clientFetchNoteById(id),
    enabled: !!id,
  });

  if (isLoading) return <Loader />;
  if (isError) return <ErrorMessage message={error.message} />;
  if (!note) return <ErrorMessage message="Note details not available." />;

  return (
    <div className={css.container}>
      <h1 className={css.title}>{note.title}</h1>
      <p className={css.tag}>{note.tag}</p>
      <p className={css.content}>{note.content}</p>
    </div>
  );
}
