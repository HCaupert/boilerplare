import { createMiddleware } from "hono/factory";

import { createAppContainer } from "@/lib/di/container";
import type { HonoEnv } from "@/lib/hono/hono.factory";

export const containerMiddleware = createMiddleware<HonoEnv>(
  async (c, nextMiddleware) => {
    c.set("container", createAppContainer(c.env, c.req.raw.headers).cradle);
    await nextMiddleware();
  }
);
