import NoteList from "@/components/NoteList/NoteList";
import { fetchNotes } from "@/lib/api";

export default async function FilteredNotesPage({
  params,
}: {
  params: { tag?: string[] };
}) {
  const tag = params.tag?.[0];

  const data =
    tag && tag !== "all"
      ? await fetchNotes({ search: tag }) // фільтрований запит
      : await fetchNotes(); // всі нотатки

  return <NoteList notes={data.data} />;
}
