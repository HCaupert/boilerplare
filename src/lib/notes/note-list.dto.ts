import type { z } from "zod";

import { PaginationRequest } from "@/lib/pagination/pagination.dto";

export const NoteListRequest = PaginationRequest;

export type NoteListRequestDto = z.infer<typeof NoteListRequest>;
