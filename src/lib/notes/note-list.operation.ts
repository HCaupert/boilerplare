import { desc, eq } from "drizzle-orm";

import type { CurrentUser } from "@/lib/auth/current-user";
import type { Db } from "@/lib/db";
import { noteTable } from "@/lib/db/schema";

import type { NoteListRequestDto } from "./note-list.dto";
import { toResponseDto } from "./note.dto";

export function noteListOperation({
  db,
  currentUser,
}: {
  db: Db;
  currentUser: CurrentUser;
}) {
  async function execute({ offset, limit }: NoteListRequestDto) {
    const user = await currentUser.get();

    const notes = await db
      .select()
      .from(noteTable)
      .where(eq(noteTable.userId, user.id))
      .orderBy(desc(noteTable.createdAt))
      .offset(offset)
      .limit(limit);

    return { items: notes.map(toResponseDto) };
  }

  return { execute };
}
