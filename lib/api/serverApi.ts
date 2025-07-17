import { nextServer } from "./api";
import { cookies } from "next/headers";
import { User } from "@/types/user";
import { Note, NotesResponse } from "@/types/note";

const getCookieHeader = async (): Promise<string> => {
  const cookieStore = await cookies();
  return cookieStore.toString();
};

export const getUserFromServer = async (): Promise<User> => {
  const cookieHeader = await getCookieHeader();
  const { data } = await nextServer.get<User>("/users/me", {
    headers: {
      Cookie: cookieHeader,
    },
  });
  return data;
};

export const checkServerSession = async () => {
  const cookieHeader = await getCookieHeader();
  const response = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieHeader,
    },
  });
  return response;
};

export const fetchNoteByIdServer = async (id: string): Promise<Note> => {
  const cookieHeader = await getCookieHeader();
  const { data } = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieHeader,
    },
  });
  return data;
};

export const fetchNotesServer = async (
  searchText: string,
  page = 1,
  perPage = 10,
  tag?: string
): Promise<NotesResponse> => {
  const cookieHeader = await getCookieHeader();
  const { data } = await nextServer.get<NotesResponse>("/notes", {
    params: {
      ...(searchText !== "" && { search: searchText }),
      page,
      perPage,
      ...(tag && tag !== "All" && { tag }),
    },
    headers: {
      Cookie: cookieHeader,
    },
  });

  return data;
};
