import { cookies } from "next/headers";
import instance from "./api";
import { Note, NoteData } from "@/types/note";
import { User } from "@/types/user";
import { AxiosError } from "axios";

interface PaginatedNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const createNote = async (noteData: NoteData): Promise<Note> => {
  try {
    const cookie = cookies().toString();
    const { data } = await instance.post<Note>("/notes", noteData, {
      headers: {
        Cookie: cookie,
      },
    });
    return data;
  } catch (error: unknown) {
    console.error("Error creating note server-side:", error);
    throw error;
  }
};

export const fetchNotes = async (
  page: number = 1,
  query: string = "",
  tag?: string | null
): Promise<PaginatedNotesResponse> => {
  const params = new URLSearchParams({
    page: String(page),
    perPage: "12",
  });
  if (query) params.append("search", query);
  if (tag && tag !== "All") params.append("tag", tag);

  try {
    const cookie = cookies().toString();
    const { data } = await instance.get<PaginatedNotesResponse>(
      `/notes?${params.toString()}`,
      {
        headers: { Cookie: cookie },
      }
    );
    return data;
  } catch (error: unknown) {
    console.error("Error fetching notes server-side:", error);
    return { notes: [], totalPages: 0 };
  }
};

export const fetchNoteById = async (id: number): Promise<Note | null> => {
  try {
    const cookie = cookies().toString();
    const { data } = await instance.get<Note>(`/notes/${id}`, {
      headers: { Cookie: cookie },
    });
    return data;
  } catch (error: unknown) {
    console.error(`Error fetching note by ID ${id} server-side:`, error);
    if (error instanceof AxiosError && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
};

export const getServerSideProfile = async (): Promise<User | null> => {
  try {
    const cookie = cookies().toString();
    if (!cookie) return null;

    const { data } = await instance.get<User>("/users/me", {
      headers: { Cookie: cookie },
    });
    return data;
  } catch (error: unknown) {
    console.error("Failed to get server side profile:", error);
    return null;
  }
};
