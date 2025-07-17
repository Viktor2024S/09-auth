import type { Note, NewNote, NotesResponse } from "@/types/note";
import { nextServer } from "./api";
import { User } from "@/types/user";
import { UserRequest, CheckSessionResponse } from "@/types/user";
import { AxiosError } from "axios";

export const fetchNotes = async (
  searchText: string,
  page = 1,
  perPage = 10,
  tag?: string
): Promise<NotesResponse> => {
  const { data } = await nextServer.get<NotesResponse>("/notes", {
    params: {
      ...(searchText !== "" && { search: searchText }),
      page,
      perPage,
      ...(tag && tag !== "All" && { tag }),
    },
  });

  return data;
};

export const createNote = async (noteData: NewNote): Promise<Note> => {
  const { data } = await nextServer.post<Note>("/notes", noteData);
  return data;
};

export const deleteNote = async (notesId: string): Promise<Note> => {
  const { data } = await nextServer.delete<Note>(`/notes/${notesId}`);
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await nextServer.get<Note>(`/notes/${id}`);
  return data;
};

export const register = async (data: UserRequest): Promise<User> => {
  const response = await nextServer.post<User>("/auth/register", data);
  return response.data;
};

export const login = async (data: UserRequest): Promise<User> => {
  const response = await nextServer.post<User>("/auth/login", data);
  return response.data;
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
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    if (
      axiosError.response?.status === 400 ||
      axiosError.response?.status === 401
    ) {
      return { success: false, message: axiosError.response.data.message };
    }
    throw error;
  }
};

export const getMe = async (): Promise<User> => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

export const updateUser = async (data: { username: string }): Promise<User> => {
  const response = await nextServer.patch<User>("/users/me", data);
  return response.data;
};
