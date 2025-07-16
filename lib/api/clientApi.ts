// lib/api/clientApi.ts
import instance from "./api";
import { User, UserAuth, UserUpdate, AuthResponse } from "@/types/user";
import { Note, NoteData } from "@/types/note";

interface PaginatedNotesResponse {
  notes: Note[];
  totalPages: number;
}

// --- AUTHENTICATION ---
export const registerUser = async (
  credentials: UserAuth
): Promise<AuthResponse> => {
  const { data } = await instance.post<AuthResponse>(
    "/auth/register",
    credentials
  );
  return data;
};

export const loginUser = async (
  credentials: UserAuth
): Promise<AuthResponse> => {
  const { data } = await instance.post<AuthResponse>(
    "/auth/login",
    credentials
  );
  return data;
};

export const logoutUser = async (): Promise<void> => {
  await instance.post("/auth/logout");
};

export const checkSession = async (): Promise<AuthResponse | null> => {
  try {
    const { data } = await instance.get<AuthResponse>("/auth/session");
    // The backend returns a user object on success or an empty object/error on failure
    if (data && data.user) {
      return data;
    }
    return null;
  } catch {
    // This will catch 401 Unauthorized or other network errors.
    // We don't need the error object itself, just to know that the request failed.
    return null;
  }
};

// --- USERS ---
export const getMyProfile = async (): Promise<User> => {
  const { data } = await instance.get<User>("/users/me");
  return data;
};

export const updateUser = async (updatedFields: UserUpdate): Promise<User> => {
  const { data } = await instance.patch<User>("/users/me", updatedFields);
  return data;
};

// --- NOTES ---
export const clientFetchNotes = async (
  page: number,
  query: string = "",
  tag: string | null = null
): Promise<PaginatedNotesResponse> => {
  const params = new URLSearchParams({ page: String(page), perPage: "12" });
  if (query) params.append("search", query);
  if (tag && tag !== "All") params.append("tag", tag);

  const { data } = await instance.get<PaginatedNotesResponse>(
    `/notes?${params.toString()}`
  );
  return data;
};

export const clientFetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await instance.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (noteData: NoteData): Promise<Note> => {
  const { data } = await instance.post<Note>("/notes", noteData);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await instance.delete<Note>(`/notes/${id}`);
  return data;
};
