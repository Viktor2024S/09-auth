export interface Note {
  updatedAt: string;
  tag: string;
  createdAt: string;
  id: string;
  content: string;
  title: string;
}

export interface NewNote {
  content: string;
  tag: string;
  title: string;
}

export interface NotesResponse {
  page: number;
  tag: string;
  totalPages: number;
  notes: Note[];
}
