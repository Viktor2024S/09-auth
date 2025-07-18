import { useQuery } from "@tanstack/react-query";
import { clientFetchNoteById } from "@/lib/api/clientApi";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";

interface NoteDetailsProps {
  noteId: string;
}

export default function NoteDetails({ noteId }: NoteDetailsProps) {
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
  if (isError)
    return (
      <ErrorMessage displayMessage={error?.message || "An error occurred."} />
    );
  if (!note)
    return <ErrorMessage displayMessage="Note details not available." />;

  return (
    <div>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
    </div>
  );
}
