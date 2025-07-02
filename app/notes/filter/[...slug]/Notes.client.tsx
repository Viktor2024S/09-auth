"use client";

import { useState, useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { Toaster } from "react-hot-toast";
import { fetchNotes } from "@/lib/api";
import { Note } from "@/types/note";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import Loader from "@/components/Loader/Loader";
import css from "./Notes.module.css";

interface NotesClientProps {
  initialData: {
    // notes: any[];
    notes: Note[];
    totalPages: number;
  };
  currentTag: string;
}

export default function NotesClient({
  initialData,
  currentTag,
}: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
  }, [currentTag]);

  const { data, isLoading } = useQuery({
    queryKey: ["notes", currentPage, debouncedSearchQuery, currentTag],
    queryFn: () => fetchNotes(currentPage, debouncedSearchQuery, currentTag),
    placeholderData: keepPreviousData,
    initialData: initialData,
  });

  const handlePageChange = ({ selected }: { selected: number }) =>
    setCurrentPage(selected + 1);
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.container}>
      <Toaster position="top-right" reverseOrder={false} />
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onChange={handleSearchChange} />

        <button className={css.button} onClick={() => setCreateModalOpen(true)}>
          Create note +
        </button>
      </header>

      {isLoading && <Loader />}
      {notes.length > 0 ? (
        <NoteList notes={notes} />
      ) : (
        <p>No notes found for this filter.</p>
      )}

      {totalPages > 1 && !isLoading && (
        <div className={css.paginationContainer}>
          <Pagination
            pageCount={totalPages}
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
        </div>
      )}

      {isCreateModalOpen && (
        <Modal onClose={() => setCreateModalOpen(false)}>
          <NoteForm onClose={() => setCreateModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
