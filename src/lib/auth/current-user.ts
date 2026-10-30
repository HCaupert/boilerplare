import { unauthorized } from "@/lib/errors/error.factory";

import type { Auth } from "./auth";

export function currentUser({
  auth,
  headers,
}: {
  auth: Auth;
  headers: Headers;
}) {
  // Resolved once per scope.
  const session = auth.api.getSession({ headers });

  async function get() {
    const resolved = await session;

    if (!resolved) {
      throw unauthorized("UNAUTHENTICATED");
    }

    return resolved.user;
  }

  return { get };
}

export type CurrentUser = ReturnType<typeof currentUser>;
