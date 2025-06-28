import axios, { AxiosResponse } from "axios";
import { Note, NoteData } from "../types/note";

const apiClient = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
});

apiClient.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

interface PaginatedNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number = 1,
  query: string = "",
  tag?: string | null
): Promise<PaginatedNotesResponse> => {
  const params = new URLSearchParams({
    page: String(page),
    perPage: "12",
  });
  if (query) {
    params.append("search", query);
  }
  // Додаємо тег до запиту, тільки якщо він не 'All'
  if (tag && tag !== "All") {
    params.append("tag", tag);
  }
  const response: AxiosResponse<PaginatedNotesResponse> = await apiClient.get(
    `/notes?${params.toString()}`
  );
  return response.data;
};

export const fetchNoteById = async (id: number): Promise<Note> => {
  const response: AxiosResponse<Note> = await apiClient.get(`/notes/${id}`);
  return response.data;
};

// ... решта функцій: createNote, deleteNote ...
export const createNote = async (noteData: NoteData): Promise<Note> => {
  const response: AxiosResponse<Note> = await apiClient.post(
    "/notes",
    noteData
  );
  return response.data;
};

export const deleteNote = async (noteId: number): Promise<Note> => {
  const response: AxiosResponse<Note> = await apiClient.delete(
    `/notes/${noteId}`
  );
  return response.data;
};
