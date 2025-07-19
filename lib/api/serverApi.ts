import { User } from "@/types/user";
import { Note, NotesResponse } from "@/types/note";
import { cookies } from "next/headers";
import { nextServer } from "./api";

async function retrieveCookieHeader(): Promise<string> {
  const cookieStore = await cookies();
  return cookieStore.toString();
}

export async function getUserFromServer(): Promise<User> {
  const cookie = await retrieveCookieHeader();
  const { data } = await nextServer.get<User>("/users/me", {
    headers: { Cookie: cookie },
  });
  return data;
}

export async function checkServerSession() {
  const cookie = await retrieveCookieHeader();
  return await nextServer.get("/auth/session", {
    headers: { Cookie: cookie },
  });
}

export async function fetchNoteByIdServer(noteId: string): Promise<Note> {
  const cookie = await retrieveCookieHeader();
  const { data } = await nextServer.get<Note>(`/notes/${noteId}`, {
    headers: { Cookie: cookie },
  });
  return data;
}

export async function fetchNotesServer(
  query: string,
  pageNum = 1,
  perPageCount = 10,
  tagFilter?: string
): Promise<NotesResponse> {
  const cookie = await retrieveCookieHeader();
  const params = {
    ...(query !== "" && { search: query }),
    page: pageNum,
    perPage: perPageCount,
    ...(tagFilter && tagFilter !== "All" && { tag: tagFilter }),
  };

  const { data } = await nextServer.get<NotesResponse>("/notes", {
    params,
    headers: { Cookie: cookie },
  });
  return data;
}
