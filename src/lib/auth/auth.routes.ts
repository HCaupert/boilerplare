import { hono } from "@/lib/hono/hono.factory";

export const authRoutes = hono().all(
  "/*",
  async (c) => await c.var.container.auth.handler(c.req.raw)
);
