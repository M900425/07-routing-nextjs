"use client";
import { useRouter } from "next/navigation";
import Modal from "../../../../components/Modal/Modal";
import NoteDetailsClient from "../../../notes/[id]/NoteDetails.client";

export default function NotePreview({ id }: { id: string }) {
  const router = useRouter();

  return (
    <Modal onClose={() => router.back()}>
      <NoteDetailsClient id={id} />
    </Modal>
  );
}
