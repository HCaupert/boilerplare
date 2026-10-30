import type { CurrentUser } from "@/lib/auth/current-user";
import type { Db } from "@/lib/db";
import { noteTable } from "@/lib/db/schema";

import type { NoteCreateRequestDto } from "./note-create.dto";
import { toResponseDto } from "./note.dto";

export function noteCreateOperation({
  db,
  currentUser,
}: {
  db: Db;
  currentUser: CurrentUser;
}) {
  async function execute(requestDto: NoteCreateRequestDto) {
    const user = await currentUser.get();

    const [note] = await db
      .insert(noteTable)
      .values({ ...requestDto, userId: user.id })
      .returning();

    return toResponseDto(note!);
  }

  return { execute };
}
