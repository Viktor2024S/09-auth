import { cookies } from "next/headers";
import instance from "./api";
import { Note } from "@/types/note";
import { User } from "@/types/user";

interface PaginatedNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number,
  query: string,
  tag: string | null
): Promise<PaginatedNotesResponse> => {
  const params = new URLSearchParams({ page: String(page), perPage: "12" });
  if (query) params.append("search", query);
  if (tag && tag !== "All") params.append("tag", tag);

  const cookie = cookies().toString();
  const { data } = await instance.get<PaginatedNotesResponse>(
    `/notes?${params.toString()}`,
    {
      headers: { Cookie: cookie },
    }
  );
  return data;
};

export const fetchNoteById = async (id: number): Promise<Note> => {
  const cookie = cookies().toString();
  const { data } = await instance.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookie },
  });
  return data;
};

export const getServerSideProfile = async (): Promise<User | null> => {
  try {
    const cookie = cookies().toString();
    if (!cookie) return null;
    const { data } = await instance.get<User>("/users/me", {
      headers: { Cookie: cookie },
    });
    return data;
  } catch {
    return null;
  }
};
