import NoteForm from "@/components/NoteForm/NoteForm";
import styles from "./CreateNote.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Note - NoteHub",
  description: "Create a new note to organize your thoughts and tasks.",
  openGraph: {
    title: "Create Note - NoteHub",
    description: "Use NoteHub to create and manage your notes easily.",
    url: "https://09-auth-pi.vercel.app/notes/action/create",
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
    <section className={styles.main}>
      <article className={styles.container}>
        <header>
          <h2 className={styles.title}>Create note</h2>
        </header>
        <NoteForm />
      </article>
    </section>
  );
};

export default CreateNote;
