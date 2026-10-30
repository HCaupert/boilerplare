import { z } from "zod";

import { NoteContent, NoteTitle } from "./note.dto";

export const NoteCreateRequest = z.strictObject({
  content: NoteContent,
  title: NoteTitle,
});

export type NoteCreateRequestDto = z.infer<typeof NoteCreateRequest>;
