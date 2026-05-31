# Website | Burn

Waitlist application for the Burn macOS menu bar app.

---

## Stack

- **Turborepo** — monorepo task orchestration
- **Bun** — package manager and runtime
- **Next.js 15** — web app
- **Drizzle ORM** — database schema and migrations (Postgres)
- **Better Auth** — authentication
- **Upstash** — Redis rate limiting


## Apps

| App | Path | Port |
|-----|------|------|
| `burn-web` | `apps/web` | 3015 |

## Getting started

```sh
bun install
bun run dev
```

## Common commands

| Command | Description |
|---------|-------------|
| `bun run dev` | Start all apps in development mode |
| `bun run build` | Build all apps |
| `bun run start` | Start all apps in production mode |
| `bun run test` | Run integration tests (from `apps/web/`) |
| `bun run db:push` | Push schema changes to the database |
| `bun run db:generate` | Regenerate auth schema |
