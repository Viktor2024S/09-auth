import { Metadata } from "next";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug?.[0] || "All";
  const pageTitle = tag === "All" ? "All Notes" : `Notes with tag: ${tag}`;
  const pageDescription = `Browse and manage your notes. Current filter: ${tag}.`;

  return {
    title: pageTitle,
    description: pageDescription,
  };
}

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
