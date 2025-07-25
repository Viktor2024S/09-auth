export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: string;
}

export interface NewNote {
  title: string;
  content: string;
  tag: string;
}

export interface NotesResponse {
  notes: Note[];
  page: number;
  totalPages: number;
  tag: string;
}
