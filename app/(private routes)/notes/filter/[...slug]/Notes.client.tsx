"use client";
import { useState, useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import { clientFetchNotes } from "@/lib/api/clientApi";
import { Note } from "@/types/note";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Loader from "@/components/Loader/Loader";
import css from "./Notes.module.css";

interface NotesClientProps {
  initialData: { notes: Note[]; totalPages: number };
  currentTag: string;
}

export default function NotesClient({
  initialData,
  currentTag,
}: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  useEffect(() => {
    setCurrentPage(1);
  }, [currentTag, debouncedSearchQuery]);

  const { data, isLoading } = useQuery({
    queryKey: ["notes", currentPage, debouncedSearchQuery, currentTag],
    queryFn: () =>
      clientFetchNotes(currentPage, debouncedSearchQuery, currentTag),
    placeholderData: keepPreviousData,
    initialData: initialData,
  });

  const handlePageChange = ({ selected }: { selected: number }) =>
    setCurrentPage(selected + 1);
  const handleSearchChange = (query: string) => setSearchQuery(query);

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.container}>
      <Toaster position="top-right" reverseOrder={false} />
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onChange={handleSearchChange} />
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>
      {isLoading && <Loader />}
      {notes.length > 0 ? <NoteList notes={notes} /> : <p>No notes found.</p>}
      {totalPages > 1 && !isLoading && (
        <div className={css.paginationContainer}>
          <Pagination
            pageCount={totalPages}
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
        </div>
      )}
    </div>
  );
}
