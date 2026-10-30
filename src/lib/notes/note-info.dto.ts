import { z } from "zod";

export const NoteInfoParams = z.object({ noteId: z.uuid() });

export type NoteInfoParamsDto = z.infer<typeof NoteInfoParams>;
