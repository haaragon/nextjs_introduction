# prisma/

Prisma + PostgreSQL implementation notes. See root [CLAUDE.md](../CLAUDE.md) for commands/architecture and [README.md](../README.md#database-postgresql-via-docker-local-only) for local setup/reset workflows.

- Schema lives in `schema.prisma`; the `Product` model backs the products API/page (`app/api/products/route.ts`, `app/products/products-table.tsx`).
- The generated Prisma client outputs to `app/generated/prisma` (custom `output` in the `generator client` block) and is gitignored — always run `npx prisma generate` (or `migrate dev`, which does it automatically) after pulling schema changes, before relying on `@/generated/prisma` types.
- Migrations live in `migrations/`; create new ones with `npx prisma migrate dev --name <description>` after editing `schema.prisma` — don't hand-edit existing migration SQL files.
- `seed.js` (run via `npm run db:seed` or automatically by `prisma migrate reset`) wipes the `Product` table and reloads 5 rows sourced from `app/products/data.json`, with hardcoded prices — it's local sample data, not representative of a real dataset.
- `DATABASE_URL` and the `POSTGRES_*` vars are read from `.env` (see `../.env.example`); `.env` is gitignored and must be created locally via `cp .env.example .env`.
