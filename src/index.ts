import { authRoutes } from "./lib/auth/auth.routes";
import { authenticatedMiddleware } from "./lib/auth/authenticated.middleware";
import { containerMiddleware } from "./lib/di/container.middleware";
import { hono } from "./lib/hono/hono.factory";
import { noteRoutes } from "./lib/notes/note.routes";

const authenticatedRoutes = hono()
  .use(authenticatedMiddleware)
  .route("/notes", noteRoutes);

const app = hono()
  .basePath("/api")
  .use(containerMiddleware)
  .route("/auth", authRoutes)
  .route("/", authenticatedRoutes);

export default app;
