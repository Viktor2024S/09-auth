"use server";

import { NoteData } from "@/types/note";
import { serverInstance } from "@/lib/api/serverApi";

export async function createNoteAction(data: NoteData) {
  try {
    const response = await serverInstance.post("/notes", data);
    return response.data;
  } catch (error) {
    console.error("Failed to create note:", error);
    throw new Error("Failed to create note.");
  }
}
