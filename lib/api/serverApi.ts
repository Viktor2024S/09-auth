import { User } from "@/types/user";
import { Note, NotesResponse } from "@/types/note";
import { nextServer } from "./api";
import { cookies } from "next/headers";

const retrieveRequestCookieHeader = async (): Promise<string> => {
  const cookieJar = await cookies();
  return cookieJar.toString();
};

export const fetchAuthenticatedUser = async (): Promise<User> => {
  const requestCookieData = await retrieveRequestCookieHeader();
  const { data: userDataResponse } = await nextServer.get<User>("/users/me", {
    headers: {
      Cookie: requestCookieData,
    },
  });
  return userDataResponse;
};

export const validateServerSession = async () => {
  const sessionCookieInfo = await retrieveRequestCookieHeader();
  const sessionCheckResponse = await nextServer.get("/auth/session", {
    headers: {
      Cookie: sessionCookieInfo,
    },
  });
  return sessionCheckResponse;
};

export const retrieveNoteDetailById = async (
  noteEntryId: string
): Promise<Note> => {
  const noteCookieHeader = await retrieveRequestCookieHeader();
  const { data: noteDetailPayload } = await nextServer.get<Note>(
    `/notes/${noteEntryId}`,
    {
      headers: {
        Cookie: noteCookieHeader,
      },
    }
  );
  return noteDetailPayload;
};

export const queryServerNotes = async (
  queryText: string,
  currentPage = 1,
  itemsPerPage = 10,
  tagParam?: string
): Promise<NotesResponse> => {
  const notesCookieInfo = await retrieveRequestCookieHeader();
  const { data: notesCollectionData } = await nextServer.get<NotesResponse>(
    "/notes",
    {
      params: {
        ...(queryText !== "" && { search: queryText }),
        page: currentPage,
        perPage: itemsPerPage,
        ...(tagParam && tagParam !== "All" && { tag: tagParam }),
      },
      headers: {
        Cookie: notesCookieInfo,
      },
    }
  );

  return notesCollectionData;
};
