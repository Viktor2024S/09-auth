import { UserRequest, CheckSessionResponse } from "@/types/user";
import type { Note, NewNote, NotesResponse } from "@/types/note";
import { nextServer } from "./api";
import { User } from "@/types/user";
import { AxiosError } from "axios";

export const fetchNotes = async (
  query: string,
  currentPage = 1,
  itemsPerPage = 10,
  selectedTag?: string
): Promise<NotesResponse> => {
  const params = {
    ...(query !== "" && { search: query }),
    page: currentPage,
    perPage: itemsPerPage,
    ...(selectedTag && selectedTag !== "All" && { tag: selectedTag }),
  };

  const { data } = await nextServer.get<NotesResponse>("/notes", { params });
  return data;
};

export const createNote = async (payload: NewNote): Promise<Note> => {
  const { data } = await nextServer.post<Note>("/notes", payload);
  return data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const { data } = await nextServer.delete<Note>(`/notes/${noteId}`);
  return data;
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const { data } = await nextServer.get<Note>(`/notes/${noteId}`);
  return data;
};

export const register = async (credentials: UserRequest): Promise<User> => {
  const res = await nextServer.post<User>("/auth/register", credentials);
  return res.data;
};

export const login = async (credentials: UserRequest): Promise<User> => {
  const res = await nextServer.post<User>("/auth/login", credentials);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export const checkSession = async (): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const { data, status } =
      await nextServer.get<CheckSessionResponse>("/auth/session");
    return { success: status === 200, message: data.message };
  } catch (err) {
    const axiosErr = err as AxiosError<{ message: string }>;
    if (
      axiosErr.response?.status === 400 ||
      axiosErr.response?.status === 401
    ) {
      return { success: false, message: axiosErr.response.data.message };
    }
    throw err;
  }
};

export const getMe = async (): Promise<User> => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

export const updateUser = async (update: {
  username: string;
}): Promise<User> => {
  const res = await nextServer.patch<User>("/users/me", update);
  return res.data;
};
