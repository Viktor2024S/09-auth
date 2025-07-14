"use server";

import { revalidatePath } from "next/cache";
import { createNote } from "./api/serverApi";
import { NoteData } from "@/types/note";

export async function createNoteAction(
  noteData: NoteData
): Promise<{ success: boolean; error?: string }> {
  try {
    await createNote(noteData);
    revalidatePath("/notes");
    return { success: true };
  } catch (error) {
    console.error("Failed to create note:", error);
    let errorMessage = "Failed to create note.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { success: false, error: errorMessage };
  }
}
