import NotesClient from "./Notes.client";

interface FilteredNotesPageProps {
  params: { slug?: string[] };
}

export default function FilteredNotesPage({ params }: FilteredNotesPageProps) {
  const tag = params?.slug?.[0] ?? "all";

  return <NotesClient initialTag={tag} />;
}
