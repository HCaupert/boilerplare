import { z } from "zod";

import { NoteContent, NoteTitle } from "@/lib/notes/note.dto";

export const NoteCreateRequestDto = z.strictObject({
  content: NoteContent,
  title: NoteTitle,
});

export type NoteCreateRequestDto = z.infer<typeof NoteCreateRequestDto>;
