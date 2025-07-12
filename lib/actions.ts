"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createNote } from "./api/serverApi";
import { NoteData } from "@/types/note";

export async function createNoteAction(noteData: NoteData) {
  try {
    await createNote(noteData);
  } catch (error) {
    console.error("Failed to create note:", error);
    return { error: "Failed to create note. Please try again." };
  }

  revalidatePath("/notes/filter");
  redirect("/notes/filter/All");
}
