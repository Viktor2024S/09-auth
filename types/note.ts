export interface Note {
  _id: string;
  title: string;
  content: string;
  tag: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export interface NoteData {
  title: string;
  content: string;
  tag: string;
}
