import { useQuery } from "@tanstack/react-query";
import { clientFetchNoteById } from "@/lib/api/clientApi";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import css from "./NotePreview.module.css";

interface NotePreviewClientProps {
  noteId: number;
}

export default function NotePreviewClient({ noteId }: NotePreviewClientProps) {
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
  if (isError) return <ErrorMessage message={error.message} />;
  if (!note) return <ErrorMessage message="Note preview not available." />;

  return (
    <div className={css.modalOverlay}>
      <div className={css.modalContent}>
        <h2 className={css.title}>{note.title}</h2>
        <p className={css.tag}>{note.tag}</p>
        <div className={css.content}>
          <p>{note.content.substring(0, 200)}...</p>{" "}
        </div>

        {/* <button onClick={() => window.history.back()}>Close</button> */}
      </div>
    </div>
  );
}
