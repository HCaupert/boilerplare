import { desc, eq } from "drizzle-orm";

import type { CurrentUser } from "@/lib/auth/current-user";
import type { Db } from "@/lib/db";
import { noteTable } from "@/lib/db/schema";
import type { NoteListRequestDto } from "@/lib/notes/note-list.dto";
import { toResponseDto } from "@/lib/notes/note.dto";
import { toPageResponseDto } from "@/lib/pagination/pagination.dto";

export function noteListOperation({
  db,
  currentUser,
}: {
  db: Db;
  currentUser: CurrentUser;
}) {
  async function execute(requestDto: NoteListRequestDto) {
    const user = await currentUser.get();
    const userNotes = eq(noteTable.userId, user.id);

    const [notes, totalElements] = await Promise.all([
      db
        .select()
        .from(noteTable)
        .where(userNotes)
        .orderBy(desc(noteTable.createdAt))
        .offset(requestDto.page * requestDto.size)
        .limit(requestDto.size),
      db.$count(noteTable, userNotes),
    ]);

    return toPageResponseDto(
      notes.map(toResponseDto),
      requestDto,
      totalElements
    );
  }

  return { execute };
}
