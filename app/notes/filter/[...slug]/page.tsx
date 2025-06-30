import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

export default async function NotesFilterPage({
  params,
}: {
  params: { slug?: string[] };
}) {
  const tag = params.slug?.[0] || "All";
  const initialData = await fetchNotes(1, "", tag);

  return <NotesClient initialData={initialData} currentTag={tag} />;
}
