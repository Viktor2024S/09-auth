import "server-only";
import { cookies } from "next/headers";
import axios from "axios";
import { User, UserAuth } from "@/types/user";
import { Note, PaginatedNotesResponse, Tag } from "@/types/note";

export const serverInstance = axios.create({
  // <--- ADDED export here
  baseURL: process.env.BACKEND_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

serverInstance.interceptors.request.use(
  async (config) => {
    const nextCookies = await cookies();
    const token = nextCookies.get("token")?.value;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

serverInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      const nextCookies = await cookies();
      nextCookies.delete("token");
    }
    return Promise.reject(error);
  }
);

export const serverRegisterUser = async (
  credentials: UserAuth
): Promise<User> => {
  const { data } = await serverInstance.post<User>(
    "/auth/register",
    credentials
  );
  return data;
};

export const serverLoginUser = async (credentials: UserAuth): Promise<User> => {
  const { data } = await serverInstance.post<User>("/auth/login", credentials);
  return data;
};

export const serverLogoutUser = async (): Promise<void> => {
  await serverInstance.post("/auth/logout");
};

export const serverCheckSession = async (): Promise<User> => {
  const { data } = await serverInstance.get<User>("/auth/session");
  return data;
};

export const serverFetchCurrentUser = async (): Promise<User> => {
  const { data } = await serverInstance.get<User>("/users/me");
  return data;
};

export const serverFetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await serverInstance.get<Note>(`/notes/${id}`);
  return data;
};

export const serverFetchNotes = async (
  page: number = 1,
  query: string = "",
  tag: Tag | "All" = "All"
): Promise<PaginatedNotesResponse> => {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  if (query) {
    params.append("query", query);
  }
  if (tag !== "All") {
    params.append("tag", tag);
  }
  const { data } = await serverInstance.get<PaginatedNotesResponse>(
    `/notes?${params.toString()}`
  );
  return data;
};
