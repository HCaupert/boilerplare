import { sValidator } from "@hono/standard-validator";

import { hono } from "@/lib/hono/hono.factory";
import { NoteCreateRequestDto } from "@/lib/notes/note-create.dto";
import { NoteInfoParamsDto } from "@/lib/notes/note-info.dto";
import { NoteListRequestDto } from "@/lib/notes/note-list.dto";
import { NoteUpdateRequestDto } from "@/lib/notes/note-update.dto";

export const noteRoutes = hono()
  .get("/", sValidator("query", NoteListRequestDto), async (c) =>
    c.json(
      await c.var.container.noteListOperation.execute(c.req.valid("query"))
    )
  )
  .get("/:noteId", sValidator("param", NoteInfoParamsDto), async (c) =>
    c.json(
      await c.var.container.noteInfoOperation.execute(c.req.valid("param"))
    )
  )
  .patch(
    "/:noteId",
    sValidator("param", NoteInfoParamsDto),
    sValidator("json", NoteUpdateRequestDto),
    async (c) =>
      c.json(
        await c.var.container.noteUpdateOperation.execute(
          c.req.valid("param"),
          c.req.valid("json")
        )
      )
  )
  .delete("/:noteId", sValidator("param", NoteInfoParamsDto), async (c) => {
    await c.var.container.noteDeleteOperation.execute(c.req.valid("param"));

    return c.body(null, 204);
  })
  .post("/", sValidator("json", NoteCreateRequestDto), async (c) =>
    c.json(
      await c.var.container.noteCreateOperation.execute(c.req.valid("json")),
      201
    )
  );
