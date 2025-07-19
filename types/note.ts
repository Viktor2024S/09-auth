import * as z from "zod";

export const noteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  tag: z.enum([
    "Todo",
    "Work",
    "Personal",
    "Meeting",
    "Shopping",
    "Ideas",
    "Travel",
    "Finance",
    "Health",
    "Important",
  ] as const),
});

export type NoteData = z.infer<typeof noteSchema>;

export const tags = [
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
  "Ideas",
  "Travel",
  "Finance",
  "Health",
  "Important",
] as const;

export type Tag = (typeof tags)[number];

export interface Note {
  _id: string;
  title: string;
  content: string;
  tag: Tag;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedNotesResponse {
  notes: Note[];
  totalPages: number;
  currentPage: number;
  totalNotes: number;
}

export function isTagOrAll(value: string): value is Tag | "All" {
  return tags.includes(value as Tag) || value === "All";
}
