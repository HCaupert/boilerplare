import { drizzle } from "drizzle-orm/d1";

export function db({ env }: { env: Env }) {
  return drizzle(env.DB);
}

export type Db = ReturnType<typeof db>;
