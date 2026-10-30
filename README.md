# boilerplare

A Cloudflare Workers backend: Hono, Better Auth (email and password), Drizzle on D1, and Awilix for dependency injection. It has one example resource: notes.

## Develop

```sh
bun install
bun db:migrate
bun dev
```

The server starts on `http://localhost:8787`. `.env` holds the local development values. To override them, write them in `.env.local`.

Only the emails in `ALLOWED_EMAILS` of `wrangler.jsonc` can sign up.

Try the API:

```sh
curl -c cookies -H 'content-type: application/json' \
  -d '{"email":"you@example.com","password":"password1234","name":"You"}' \
  http://localhost:8787/api/auth/sign-up/email

curl -b cookies -H 'content-type: application/json' \
  -d '{"title":"Hello","content":"World"}' \
  http://localhost:8787/api/notes
```

## Deploy

1. Deploy. At the first deployment, Wrangler creates the D1 database and writes its ID in `wrangler.jsonc`:

   ```sh
   bun run deploy
   ```

2. Set the secrets. `BETTER_AUTH_URL` is the URL of the deployed Worker:

   ```sh
   bunx wrangler secret put BETTER_AUTH_SECRET
   bunx wrangler secret put BETTER_AUTH_URL
   ```

3. Apply the migrations:

   ```sh
   bun db:migrate --remote
   ```
