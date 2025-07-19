"use client";

import { fetchNotes } from "@/lib/api/clientApi";
import { NoteList } from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import css from "./Notes.client.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { SearchBox } from "@/components/SearchBox/SearchBox";
import { useDebounce } from "use-debounce";
import { Toaster } from "react-hot-toast";
import { ErrorMessage } from "@/components/ErrorMesage/ErrorMesage";
import { Loader } from "@/components/Loader/Loader";
import type { NotesResponse } from "@/types/note";
import { useRouter } from "next/navigation";

interface NotesClientProps {
  initialData: NotesResponse;
  activeTag: string;
}

const NotesClient = ({ initialData, activeTag }: NotesClientProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["notes", debouncedSearchQuery, currentPage, activeTag],
    queryFn: () => fetchNotes(debouncedSearchQuery, currentPage, 12, activeTag),
    placeholderData: keepPreviousData,
    initialData:
      debouncedSearchQuery === "" &&
      currentPage === 1 &&
      (initialData.tag ?? "") === (activeTag ?? "")
        ? initialData
        : undefined,
  });

  const handleSearchQuery = (newQuery: string) => {
    setSearchQuery(newQuery);
    setCurrentPage(1);
  };

  const totalPages = data?.totalPages ?? 0;
  const notes = data?.notes ?? [];

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox value={searchQuery} onSearch={handleSearchQuery} />
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={(page: number) => setCurrentPage(page)}
            />
          )}
          <button
            className={css.button}
            onClick={() => router.push("/notes/action/create")}
          >
            Create note +
          </button>
        </header>

        {error && <ErrorMessage message="Could not fetch the list of notes." />}
        {isLoading && <Loader />}
        {!isLoading && !error && notes.length > 0 && <NoteList notes={notes} />}
        {!isLoading && !error && notes.length === 0 && (
          <p>No notes found for your search.</p>
        )}
      </div>
    </>
  );
};

export default NotesClient;
