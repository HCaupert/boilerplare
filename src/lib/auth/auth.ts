import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { APIError } from "better-auth/api";
import { betterAuth } from "better-auth/minimal";

import type { Db } from "@/lib/db";
import * as schema from "@/lib/db/schema";

export function auth({ db, env }: { db: Db; env: Env }) {
  return betterAuth({
    advanced: { database: { generateId: "uuid" } },
    baseURL: env.BETTER_AUTH_URL,
    database: drizzleAdapter(db, { provider: "sqlite", schema }),
    databaseHooks: {
      user: {
        create: {
          before: async (user) => {
            if (!env.ALLOWED_EMAILS.includes(user.email)) {
              throw new APIError("FORBIDDEN", {
                code: "EMAIL_NOT_ALLOWED",
                message: "This email is not allowed to sign up",
              });
            }
          },
        },
      },
    },
    emailAndPassword: { enabled: true },
    secret: env.BETTER_AUTH_SECRET,
  });
}

export type Auth = ReturnType<typeof auth>;
