import { Metadata } from "next";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";

export const metadata: Metadata = {
  title: "Create a New Note",
  description: "Use this page to create a new note in NoteHub.",
  openGraph: {
    title: "Create a New Note | NoteHub",
    description:
      "Create and organize your thoughts with a new note in NoteHub.",
    url: "https://08-zustand-pi-six.vercel.app/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Create Note Page",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
