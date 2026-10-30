import { defineConfig } from "oxlint";
import antiSlop from "ultracite/oxlint/anti-slop";
import core from "ultracite/oxlint/core";
import drizzle from "ultracite/oxlint/drizzle";

export default defineConfig({
  env: core.env,
  extends: [core, drizzle, antiSlop],
  ignorePatterns: [
    ...(core.ignorePatterns ?? []),
    "src/lib/db/auth-schema.ts",
    "src/lib/di/typed-container.ts",
  ],
  options: { typeAware: true },
  overrides: [
    {
      files: ["**"],
      rules: {
        "func-style": "off",
        "typescript/no-non-null-assertion": "off",
      },
    },
  ],
});
