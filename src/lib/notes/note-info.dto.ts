import { z } from "zod";

export const NoteInfoParamsDto = z.object({ noteId: z.uuid() });

export type NoteInfoParamsDto = z.infer<typeof NoteInfoParamsDto>;
