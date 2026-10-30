import { and, eq } from "drizzle-orm";

import type { CurrentUser } from "@/lib/auth/current-user";
import type { Db } from "@/lib/db";
import { noteTable } from "@/lib/db/schema";
import { notFound } from "@/lib/errors/error.factory";

import type { NoteInfoParamsDto } from "./note-info.dto";
import { toResponseDto } from "./note.dto";

export function noteInfoOperation({
  db,
  currentUser,
}: {
  db: Db;
  currentUser: CurrentUser;
}) {
  async function execute({ noteId }: NoteInfoParamsDto) {
    const user = await currentUser.get();

    const [note] = await db
      .select()
      .from(noteTable)
      .where(and(eq(noteTable.id, noteId), eq(noteTable.userId, user.id)));

    if (!note) {
      throw notFound("NOTE_NOT_FOUND");
    }

    return toResponseDto(note);
  }

  return { execute };
}
