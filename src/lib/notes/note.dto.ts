import { z } from "zod";

import type { NoteSelect } from "@/lib/db/schema";

export const NoteTitle = z.string().trim().min(1);

export const NoteContent = z.string();

export type NoteResponseDto = Pick<
  NoteSelect,
  "id" | "title" | "content" | "createdAt" | "updatedAt"
>;

export const toResponseDto = (note: NoteSelect): NoteResponseDto => ({
  content: note.content,
  createdAt: note.createdAt,
  id: note.id,
  title: note.title,
  updatedAt: note.updatedAt,
});
