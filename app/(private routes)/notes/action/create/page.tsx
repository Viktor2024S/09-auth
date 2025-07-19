import NoteForm from "@/components/NoteForm/NoteForm";
import styles from "./CreateNote.module.css";
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
        alt: "Create Note page on NoteHub",
        height: 630,
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
      },
    ],
  },
};

const CreateNote = () => (
  <section className={styles.main}>
    <div className={styles.container}>
      <header>
        <h1 className={styles.title}>Create note</h1>
      </header>
      <NoteForm />
    </div>
  </section>
);

export default CreateNote;
