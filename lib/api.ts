import axios, { type AxiosResponse } from "axios";

// Типи нотатки
export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}

const BASE_URL = "https://notehub-public.goit.study/api";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
});

// Відповідь нормалізована для списку нотаток
export interface NormalizedNotesResponse {
  data: Note[];
  meta: {
    totalItems: number;
    page: number;
    perPage: number;
    totalPages: number;
  };
}

function normalizeFetchResponse(
  resp: AxiosResponse<{
    notes?: Note[];
    total?: number;
    page?: number;
    perPage?: number;
    totalPages?: number;
  }>
): NormalizedNotesResponse {
  const { notes = [], total = notes.length, page = 1, perPage = notes.length, totalPages = 1 } =
    resp.data;
  return {
    data: notes,
    meta: { totalItems: total, page, perPage, totalPages },
  };
}

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

// Отримати список нотаток
export async function fetchNotes(params: FetchNotesParams = {}): Promise<NormalizedNotesResponse> {
  const { page = 1, perPage = 12, search, tag } = params;
  const query: Record<string, string | number> = { page, perPage };
  if (search) query.search = search;
  if (tag) query.tag = tag;

  const resp = await api.get<{
    notes?: Note[];
    total?: number;
    page?: number;
    perPage?: number;
    totalPages?: number;
  }>("/notes", { params: query });

  return normalizeFetchResponse(resp);
}

// Отримати одну нотатку по id
export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
}

// Створити нотатку
export async function createNote(payload: Pick<Note, "title" | "content" | "tag">): Promise<Note> {
  const resp = await api.post<{ note?: Note; data?: Note }>("/notes", payload);
  return resp.data.note ?? resp.data.data!;
}

// Видалити нотатку
export async function deleteNote(id: string): Promise<Note> {
  const resp = await api.delete<{ note?: Note; data?: Note }>(`/notes/${id}`);
  return resp.data.note ?? resp.data.data!;
}