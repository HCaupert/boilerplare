import { createMiddleware } from "hono/factory";

import type { HonoEnv } from "@/lib/hono/hono.factory";

// Rejects requests without a user session.
export const authenticatedMiddleware = createMiddleware<HonoEnv>(
  async (c, nextMiddleware) => {
    await c.var.container.currentUser.get();
    await nextMiddleware();
  }
);
