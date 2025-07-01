import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

export default async function NotesFilterPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const tag = slug?.[0] || "All";

  const initialData = await fetchNotes(1, "", tag);

  return <NotesClient initialData={initialData} currentTag={tag} />;
}
