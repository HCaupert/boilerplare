import { HTTPException } from "hono/http-exception";
import type { ContentfulStatusCode } from "hono/utils/http-status";

const ErrorCodes = {
  NOTE_NOT_FOUND: "Note could not be found",
  UNAUTHENTICATED: "Sign in to access this resource",
} as const satisfies Record<string, string>;

export type ErrorCode = keyof typeof ErrorCodes;

function httpError(
  errorCode: ErrorCode,
  status: ContentfulStatusCode,
  detail: string = ErrorCodes[errorCode]
) {
  const problemDetail = { detail, status, title: errorCode };

  return new HTTPException(status, {
    message: detail,
    res: Response.json(problemDetail, { status }),
  });
}

export const notFound = (errorCode: ErrorCode) => httpError(errorCode, 404);
export const conflict = (errorCode: ErrorCode) => httpError(errorCode, 409);
export const unauthorized = (errorCode: ErrorCode) => httpError(errorCode, 401);

export const badRequest = (errorCode: ErrorCode, detail?: string) =>
  httpError(errorCode, 400, detail);

export const forbidden = (errorCode: ErrorCode) => httpError(errorCode, 403);
