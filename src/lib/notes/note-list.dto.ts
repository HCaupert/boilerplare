import type { z } from "zod";

import { PageRequestDto } from "@/lib/pagination/pagination.dto";

export const NoteListRequestDto = PageRequestDto;

export type NoteListRequestDto = z.infer<typeof NoteListRequestDto>;
