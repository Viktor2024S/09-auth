// export type Tag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

// export interface Note {
//   id: string;
//   title: string;
//   content: string;
//   tag: Tag;
//   owner: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export type NoteData = Pick<Note, "title" | "content" | "tag">;
// .......................
// export interface NewNote {
//   title: string;
//   content: string;
//   tag: string;
// }

// export interface NotesResponse {
//   notes: Note[];
//   page: number;
//   totalPages: number;
//   tag: string;
// }

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

export type NewNote = NoteData;

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}
