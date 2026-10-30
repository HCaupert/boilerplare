import { and, eq } from "drizzle-orm";

import type { CurrentUser } from "@/lib/auth/current-user";
import type { Db } from "@/lib/db";
import { noteTable } from "@/lib/db/schema";

import type { NoteInfoParamsDto } from "./note-info.dto";

export function noteDeleteOperation({
  db,
  currentUser,
}: {
  db: Db;
  currentUser: CurrentUser;
}) {
  async function execute({ noteId }: NoteInfoParamsDto) {
    const user = await currentUser.get();

    await db
      .delete(noteTable)
      .where(and(eq(noteTable.id, noteId), eq(noteTable.userId, user.id)));
  }

  return { execute };
}
