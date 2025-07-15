import instance from "./api";
import { User, UserAuth, UserUpdate } from "@/types/user";
import { Note, NoteData } from "@/types/note";

interface PaginatedNotesResponse {
  notes: Note[];
  totalPages: number;
}

// -------------------- AUTHENTICATION --------------------

export const registerUser = async (credentials: UserAuth): Promise<User> => {
  const { data } = await instance.post<User>("/auth/register", credentials);
  return data;
};

export const loginUser = async (credentials: UserAuth): Promise<User> => {
  const { data } = await instance.post<User>("/auth/login", credentials);
  return data;
};

export const logoutUser = async (): Promise<void> => {
  await instance.post("/auth/logout");
};

export const checkSession = async (): Promise<{ data: User | null }> => {
  try {
    const { data } = await instance.get<User | null>("/auth/session");
    return { data };
  } catch (error) {
    console.error("Session check failed:", error);
    return { data: null };
  }
};

// -------------------- USERS --------------------

export const clientFetchCurrentUser = async (): Promise<User> => {
  const { data } = await instance.get<User>("/users/me");
  return data;
};

export const updateUser = async (updatedFields: UserUpdate): Promise<User> => {
  const { data } = await instance.patch<User>("/users/me", updatedFields);
  return data;
};

export const uploadImage = async (
  file: File
): Promise<{ photoUrl: string }> => {
  const formData = new FormData();
  formData.append("avatar", file);

  const { data } = await instance.post<{ photoUrl: string }>(
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
