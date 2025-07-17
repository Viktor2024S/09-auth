// lib/api/clientApi.ts
import { nextApi } from "./api"; // <--- Змінено імпорт на іменований
import { User, UserAuth, UserUpdate } from "@/types/user";
import { Note, NoteData } from "@/types/note";

interface PaginatedNotesResponse {
  notes: Note[];
  totalPages: number;
}

// -------------------- AUTHENTICATION --------------------

export const registerUser = async (credentials: UserAuth): Promise<User> => {
  const { data } = await nextApi.post<User>("/auth/register", credentials); // <--- Змінено instance на nextApi
  return data;
};

export const loginUser = async (credentials: UserAuth): Promise<User> => {
  const { data } = await nextApi.post<User>("/auth/login", credentials); // <--- Змінено instance на nextApi
  return data;
};

export const logoutUser = async (): Promise<void> => {
  await nextApi.post("/auth/logout"); // <--- Змінено instance на nextApi
};

export const checkSession = async (): Promise<User | null> => {
  const { data } = await nextApi.get<User | null>("/auth/session"); // <--- Змінено instance на nextApi
  return data;
};

// -------------------- USERS --------------------

export const clientFetchCurrentUser = async (): Promise<User> => {
  const { data } = await nextApi.get<User>("/users/me"); // <--- Змінено instance на nextApi
  return data;
};

export const updateUser = async (updatedFields: UserUpdate): Promise<User> => {
  const { data } = await nextApi.patch<User>("/users/me", updatedFields); // <--- Змінено instance на nextApi
  return data;
};

export const uploadImage = async (
  file: File
): Promise<{ photoUrl: string }> => {
  const formData = new FormData();
  formData.append("avatar", file);

  const { data } = await nextApi.post<{ photoUrl: string }>( // <--- Змінено instance на nextApi
    "/users/upload-avatar",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
};

// -------------------- NOTES --------------------
export const clientFetchNotes = async (
  page: number,
  query: string = "",
  tag: string | null = null
): Promise<PaginatedNotesResponse> => {
  const params = new URLSearchParams({ page: String(page), perPage: "12" });
  if (query) params.append("search", query);
  if (tag && tag !== "All") params.append("tag", tag);

  const { data } = await nextApi.get<PaginatedNotesResponse>( // <--- Змінено instance на nextApi
    `/notes?${params.toString()}`
  );
  return data;
};

export const clientFetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await nextApi.get<Note>(`/notes/${id}`); // <--- Змінено instance на nextApi
  return data;
};

export const createNote = async (noteData: NoteData): Promise<Note> => {
  const { data } = await nextApi.post<Note>("/notes", noteData); // <--- Змінено instance на nextApi
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await nextApi.delete<Note>(`/notes/${id}`); // <--- Змінено instance на nextApi
  return data;
};
