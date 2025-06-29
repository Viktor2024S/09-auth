import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

interface NotesFilterPageProps {
  params: {
    slug?: string[];
  };
}

export default async function NotesFilterPage({
  params,
}: NotesFilterPageProps) {
  const tag = params.slug?.[0] || "All";

  const initialData = await fetchNotes(1, "", tag);
  return <NotesClient initialData={initialData} currentTag={tag} />;
}
