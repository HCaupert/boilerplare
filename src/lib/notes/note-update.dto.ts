import { z } from "zod";

import { NoteContent, NoteTitle } from "./note.dto";

export const NoteUpdateRequest = z
  .strictObject({
    content: NoteContent,
    title: NoteTitle,
  })
  .partial();

export type NoteUpdateRequestDto = z.infer<typeof NoteUpdateRequest>;
