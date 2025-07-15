export type Tag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: Tag;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export type NoteData = Pick<Note, "title" | "content" | "tag">;
