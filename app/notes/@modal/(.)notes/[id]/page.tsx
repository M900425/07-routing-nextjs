"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import { useRouter } from "next/navigation";

export default function NotePreview({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;

  const { data: note, isLoading } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  const close = () => router.back();

  if (isLoading || !note) return null;

  return (
    <Modal onClose={close}>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <button onClick={close}>Close</button>
    </Modal>
  );
}
