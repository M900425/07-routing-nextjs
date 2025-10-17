import axios from "axios";
import type { Note, NormalizedNotesResponse } from "../types/note";

const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
if (!TOKEN) throw new Error("Missing NEXT_PUBLIC_NOTEHUB_TOKEN env variable");

const api = axios.create({
  baseURL: "https://api.notehub.app",
  headers: { Authorization: `Bearer ${TOKEN}` },
});

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = "",
}: {
  page?: number;
  perPage?: number;
  search?: string;
}): Promise<NormalizedNotesResponse> => {
  const { data } = await api.get<NormalizedNotesResponse>("/notes", {
    params: { page, perPage, search },
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (note: Partial<Note>): Promise<Note> => {
  const { data } = await api.post<Note>("/notes", note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};