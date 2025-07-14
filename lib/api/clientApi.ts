import instance from "./api";
import { Note, NoteData } from "@/types/note";
import { User, AuthRequest, AuthResponse } from "@/types/user";

// Note-related functions for client-side usage
export const clientFetchNotes = async (
  page: number = 1,
  query: string = "",
  tag?: string | null
): Promise<{ notes: Note[]; totalPages: number }> => {
  const params = new URLSearchParams({ page: String(page), perPage: "12" });
  if (query) params.append("search", query);
  if (tag && tag !== "All") params.append("tag", tag);
  const { data } = await instance.get(`/notes?${params.toString()}`);
  return data;
};

export const clientFetchNoteById = async (id: number): Promise<Note> => {
  const { data } = await instance.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (noteData: NoteData): Promise<Note> => {
  const { data } = await instance.post<Note>("/notes", noteData);
  return data;
};

export const deleteNote = async (noteId: number): Promise<Note> => {
  const { data } = await instance.delete<Note>(`/notes/${noteId}`);
  return data;
};

// Auth & User functions
export const registerUser = async (
  credentials: AuthRequest
): Promise<AuthResponse> => {
  const { data } = await instance.post<AuthResponse>(
    "/auth/register",
    credentials
  );
  return data;
};

export const loginUser = async (
  credentials: AuthRequest
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

export const getSession = async (): Promise<AuthResponse> => {
  const { data } = await instance.get<AuthResponse>("/auth/session");
  return data;
};

export const getMyProfile = async (): Promise<User> => {
  const { data } = await instance.get<User>("/users/me");
  return data;
};

export const updateUser = async (userData: Partial<User>): Promise<User> => {
  const { data } = await instance.patch<User>("/users/me", userData);
  return data;
};
