// lib/api/serverApi.ts
import { nextApi } from "./api"; // <--- Змінено імпорт на іменований
import { Note, NoteData } from "@/types/note";
import { User } from "@/types/user";
import { AxiosResponse, AxiosError } from "axios";
import { cookies } from "next/headers";

interface PaginatedNotesResponse {
  notes: Note[];
  totalPages: number;
}

const getCookieHeader = async () => {
  const cookieStore = await cookies();
  const cookiesString = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
  console.log("DEBUG: getCookieHeader() result:", cookiesString); // DEBUG LOG
  return cookiesString;
};

export const fetchNotes = async (
  page: number,
  query: string = "",
  tag: string | null = null
): Promise<PaginatedNotesResponse> => {
  const params = new URLSearchParams({ page: String(page), perPage: "12" });
  if (query) params.append("search", query);
  if (tag && tag !== "All") params.append("tag", tag);

  const cookieHeader = await getCookieHeader();

  console.log(
    "DEBUG: fetchNotes - Request URL:",
    `/notes?${params.toString()}`
  ); // DEBUG LOG
  console.log("DEBUG: fetchNotes - Sending Cookie header:", cookieHeader); // DEBUG LOG

  try {
    const { data } = await nextApi.get<PaginatedNotesResponse>( // <--- Змінено instance на nextApi
      `/notes?${params.toString()}`,
      {
        headers: {
          ...(cookieHeader && { Cookie: cookieHeader }),
        },
      }
    );
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(
        "AxiosError in fetchNotes:",
        error.response?.status,
        error.response?.data
      );
    } else {
      console.error("Error in fetchNotes:", error);
    }
    throw error;
  }
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieHeader = await getCookieHeader();
  console.log("DEBUG: fetchNoteById - Sending Cookie header:", cookieHeader); // DEBUG LOG
  try {
    const { data } = await nextApi.get<Note>(`/notes/${id}`, {
      // <--- Змінено instance на nextApi
      headers: {
        ...(cookieHeader && { Cookie: cookieHeader }),
      },
    });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(
        "AxiosError in fetchNoteById:",
        error.response?.status,
        error.response?.data
      );
    } else {
      console.error("Error in fetchNoteById:", error);
    }
    throw error;
  }
};

export const createNote = async (noteData: NoteData): Promise<Note> => {
  const cookieHeader = await getCookieHeader();
  console.log("DEBUG: createNote - Sending Cookie header:", cookieHeader); // DEBUG LOG
  try {
    const { data } = await nextApi.post<Note>("/notes", noteData, {
      // <--- Змінено instance на nextApi
      headers: {
        ...(cookieHeader && { Cookie: cookieHeader }),
      },
    });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(
        "AxiosError in createNote:",
        error.response?.status,
        error.response?.data
      );
    } else {
      console.error("Error in createNote:", error);
    }
    throw error;
  }
};

export const serverCheckSession = async (): Promise<
  AxiosResponse<User | object>
> => {
  const cookieHeader = await getCookieHeader();
  console.log(
    "DEBUG: serverCheckSession - Sending Cookie header:",
    cookieHeader
  ); // DEBUG LOG
  try {
    return nextApi.get<User | object>("/auth/session", {
      // <--- Змінено instance на nextApi
      headers: {
        ...(cookieHeader && { Cookie: cookieHeader }),
      },
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(
        "AxiosError in serverCheckSession:",
        error.response?.status,
        error.response?.data
      );
    } else {
      console.error("Error in serverCheckSession:", error);
    }
    throw error;
  }
};

export const getServerSideProfile = async (): Promise<User | null> => {
  try {
    const cookieHeader = await getCookieHeader();
    console.log(
      "DEBUG: getServerSideProfile - Sending Cookie header:",
      cookieHeader
    ); // DEBUG LOG
    if (!cookieHeader) {
      console.log(
        "DEBUG: getServerSideProfile - No cookie header found, returning null."
      ); // DEBUG LOG
      return null;
    }

    const { data } = await nextApi.get<User>("/users/me", {
      // <--- Змінено instance на nextApi
      headers: {
        ...(cookieHeader && { Cookie: cookieHeader }),
      },
    });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(
        "AxiosError in getServerSideProfile:",
        error.response?.status,
        error.response?.data
      );
    } else {
      console.error("Error in getServerSideProfile:", error);
    }
    return null;
  }
};
