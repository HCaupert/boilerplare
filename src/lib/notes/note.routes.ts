import { sValidator } from "@hono/standard-validator";

import { hono } from "@/lib/hono/hono.factory";

import { NoteCreateRequest } from "./note-create.dto";
import { NoteInfoParams } from "./note-info.dto";
import { NoteListRequest } from "./note-list.dto";
import { NoteUpdateRequest } from "./note-update.dto";

export const noteRoutes = hono()
  .get("/", sValidator("query", NoteListRequest), async (c) =>
    c.json(
      await c.var.container.noteListOperation.execute(c.req.valid("query"))
    )
  )
  .get("/:noteId", sValidator("param", NoteInfoParams), async (c) =>
    c.json(
      await c.var.container.noteInfoOperation.execute(c.req.valid("param"))
    )
  )
  .patch(
    "/:noteId",
    sValidator("param", NoteInfoParams),
    sValidator("json", NoteUpdateRequest),
    async (c) =>
      c.json(
        await c.var.container.noteUpdateOperation.execute(
          c.req.valid("param"),
          c.req.valid("json")
        )
      )
  )
  .delete("/:noteId", sValidator("param", NoteInfoParams), async (c) => {
    await c.var.container.noteDeleteOperation.execute(c.req.valid("param"));

    return c.body(null, 204);
  })
  .post("/", sValidator("json", NoteCreateRequest), async (c) =>
    c.json(
      await c.var.container.noteCreateOperation.execute(c.req.valid("json")),
      201
    )
  );
