"use client";

import { useQuery } from "@tanstack/react-query";
import { clientFetchNotes } from "@/lib/api/clientApi";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import { Tag, PaginatedNotesResponse, Note } from "@/types/note";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

interface NotesClientProps {
  initialPage: number;
  initialTag: Tag | "All";
  initialSearchQuery: string;
  initialData: PaginatedNotesResponse;
}

export default function NotesClient({
  initialPage,
  initialTag,
  initialSearchQuery,
  initialData,
}: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [currentTag, setCurrentTag] = useState<Tag | "All">(initialTag);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  useEffect(() => {
    setCurrentPage(initialPage);
    setCurrentTag(initialTag);
    setSearchQuery(initialSearchQuery);
  }, [initialPage, initialTag, initialSearchQuery]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notes", currentPage, debouncedSearchQuery, currentTag],
    queryFn: async () =>
      clientFetchNotes(currentPage, debouncedSearchQuery, currentTag),
    initialData: initialData,
    placeholderData: (previousData) => previousData,
  });

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <ErrorMessage displayMessage={error?.message || "An error occurred."} />
    );

  const notes: Note[] = data?.notes || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search notes..."
        />
        <div>
          {(
            ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"] as (
              | Tag
              | "All"
            )[]
          ).map((tagOption) => (
            <button
              key={tagOption}
              onClick={() => setCurrentTag(tagOption)}
              style={{
                fontWeight: currentTag === tagOption ? "bold" : "normal",
              }}
            >
              {tagOption}
            </button>
          ))}
        </div>
      </div>
      {notes.length === 0 && !isLoading && !isError ? (
        <p>No notes found.</p>
      ) : (
        <ul>
          {notes.map((note: Note) => (
            <li key={note._id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <p>Tag: {note.tag}</p>
            </li>
          ))}
        </ul>
      )}
      <div>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
