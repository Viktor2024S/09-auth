import instance from "./api";
import { User, UserAuth, UserUpdate } from "@/types/user";
import { Note } from "@/types/note";

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

export const checkSession = async (): Promise<User> => {
  const { data } = await instance.get<User>("/auth/session");
  return data;
};

export const fetchCurrentUser = async (): Promise<User> => {
  const { data } = await instance.get<User>("/users/me");
  return data;
};

export const updateUser = async (updatedFields: UserUpdate): Promise<User> => {
  const { data } = await instance.patch<User>("/users/me", updatedFields);
  return data;
};

export const clientFetchNotes = async (): Promise<Note[]> => {
  const { data } = await instance.get<Note[]>("/notes");
  return data;
};

export const clientFetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await instance.get<Note>(`/notes/${id}`);
  return data;
};
