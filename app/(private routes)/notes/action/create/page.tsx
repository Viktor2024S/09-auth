import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Note - NoteHub",
  description: "Create a new note to organize your thoughts and tasks.",
  openGraph: {
    title: "Create Note - NoteHub",
    description: "Use NoteHub to create and manage your notes easily.",
    url: "https://09-auth-ruddy-nine.vercel.app/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Create Note page on NoteHub",
      },
    ],
  },
};

const CreateNote = () => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
};

export default CreateNote;
