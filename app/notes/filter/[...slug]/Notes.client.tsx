"use client";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../../../lib/api";
import NoteList from "../../../../components/NoteList/NoteList";

export default function NotesClient() {
  const pathname = usePathname();
  const slug = pathname.split("/").pop();
  const tag = slug === "all" ? undefined : slug;

  const {
    data: notesData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notes", tag],
    queryFn: () => fetchNotes(tag ? { search: tag } : {}),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading notes.</p>;

  return <NoteList notes={notesData?.data || []} />;
}
