import { Hono } from "hono";

import type { ApiContainer } from "@/lib/di/container";

export interface HonoEnv {
  Bindings: Env;
  Variables: { container: ApiContainer };
}

export const hono = () => new Hono<HonoEnv>();
