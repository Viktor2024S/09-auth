import type { Note, NewNote, NotesResponse } from "@/types/note";
import { User, UserRequest, CheckSessionResponse } from "@/types/user";
import { AxiosError } from "axios";
import { nextServer } from "./api";

export const retrieveNotes = async (
  searchQuery: string,
  pageNumber = 1,
  itemsPerPage = 10,
  tagFilter?: string
): Promise<NotesResponse> => {
  const { data: responseData } = await nextServer.get<NotesResponse>("/notes", {
    params: {
      ...(searchQuery !== "" && { search: searchQuery }),
      page: pageNumber,
      perPage: itemsPerPage,
      ...(tagFilter && tagFilter !== "All" && { tag: tagFilter }),
    },
  });

  return responseData;
};

export const addNewNote = async (newNoteDetails: NewNote): Promise<Note> => {
  const { data: createdNoteData } = await nextServer.post<Note>(
    "/notes",
    newNoteDetails
  );
  return createdNoteData;
};

export const removeNote = async (noteIdentifier: string): Promise<Note> => {
  const { data: deletedNoteData } = await nextServer.delete<Note>(
    `/notes/${noteIdentifier}`
  );
  return deletedNoteData;
};

export const getNoteDetailsById = async (
  noteIdString: string
): Promise<Note> => {
  const { data: singleNoteData } = await nextServer.get<Note>(
    `/notes/${noteIdString}`
  );
  return singleNoteData;
};

export const userSignUp = async (
  registrationPayload: UserRequest
): Promise<User> => {
  const apiRegistrationResponse = await nextServer.post<User>(
    "/auth/register",
    registrationPayload
  );
  return apiRegistrationResponse.data;
};

export const userSignIn = async (loginPayload: UserRequest): Promise<User> => {
  const apiLoginResponse = await nextServer.post<User>(
    "/auth/login",
    loginPayload
  );
  return apiLoginResponse.data;
};

export const userSignOut = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export const verifySessionStatus = async (): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const { data: sessionData, status: httpStatus } =
      await nextServer.get<CheckSessionResponse>("/auth/session");
    return { success: httpStatus === 200, message: sessionData.message };
  } catch (requestError) {
    const axError = requestError as AxiosError<{ message: string }>;
    if (axError.response?.status === 400 || axError.response?.status === 401) {
      return { success: false, message: axError.response.data.message };
    }
    throw requestError;
  }
};

export const retrieveCurrentUser = async (): Promise<User> => {
  const { data: currentUserData } = await nextServer.get<User>("/users/me");
  return currentUserData;
};

export const modifyUserProfile = async (updatePayload: {
  username: string;
}): Promise<User> => {
  const userUpdateResponse = await nextServer.patch<User>(
    "/users/me",
    updatePayload
  );
  return userUpdateResponse.data;
};
