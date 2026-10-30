import { z } from "zod";

import { NoteContent, NoteTitle } from "@/lib/notes/note.dto";

export const NoteUpdateRequestDto = z
  .strictObject({
    content: NoteContent,
    title: NoteTitle,
  })
  .partial();

export type NoteUpdateRequestDto = z.infer<typeof NoteUpdateRequestDto>;
