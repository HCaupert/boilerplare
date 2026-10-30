import { z } from "zod";

import type { NoteSelect } from "@/lib/db/schema";

export const NoteTitle = z.string().trim().min(1);

export const NoteContent = z.string();

export const toResponseDto = (note: NoteSelect) => ({
  content: note.content,
  createdAt: note.createdAt,
  id: note.id,
  title: note.title,
  updatedAt: note.updatedAt,
});
