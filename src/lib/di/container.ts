import { auth } from "@/lib/auth/auth";
import { currentUser } from "@/lib/auth/current-user";
import { db } from "@/lib/db";
import { noteCreateOperation } from "@/lib/notes/note-create.operation";
import { noteDeleteOperation } from "@/lib/notes/note-delete.operation";
import { noteInfoOperation } from "@/lib/notes/note-info.operation";
import { noteListOperation } from "@/lib/notes/note-list.operation";
import { noteUpdateOperation } from "@/lib/notes/note-update.operation";

import { asFunction, asValue, createContainer } from "./typed-container";

export function createAppContainer(env: Env, headers: Headers) {
  return createContainer({
    auth: asFunction(auth),
    currentUser: asFunction(currentUser),
    db: asFunction(db),
    env: asValue(env),
    headers: asValue(headers),
    noteCreateOperation: asFunction(noteCreateOperation),
    noteDeleteOperation: asFunction(noteDeleteOperation),
    noteInfoOperation: asFunction(noteInfoOperation),
    noteListOperation: asFunction(noteListOperation),
    noteUpdateOperation: asFunction(noteUpdateOperation),
  });
}

export type ApiContainer = ReturnType<typeof createAppContainer>["cradle"];
