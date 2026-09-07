# nextjs_introduction

Small playground with Next.js (App Router) and unit tests using Jest + Testing Library.

## Requirements

- Node.js 20+ (20.19 recommended)
- npm

## Install

```bash
npm install
```

## Scripts

- Development (Next server)

```bash
npm run dev
```

- Unit tests (Jest)

```bash
npm run test        # Watch mode
npm run test:watch  # Watch mode explicitly
npm run test:run    # CI mode
```

## Database (PostgreSQL via Docker, local only)

This project uses a local PostgreSQL instance run through Docker Desktop, for local development/testing only.

### Environment

Copy the example env file and adjust values if needed:

```bash
cp .env.example .env
```

The connection string is read from `DATABASE_URL` in `.env`, e.g.:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/<my_database>?schema=public"
```

### First-time local setup

Use this flow the first time you run the project locally:

1. Install dependencies:

```bash
npm install
```

2. Start the database container:

```bash
docker compose up -d
```

3. Apply the existing Prisma migrations to create the database structure locally:

```bash
npx prisma migrate dev
```

4. Seed the database with local test data:

```bash
npm run db:seed
```

At that point the local database has the `Product` table and 5 seeded rows, and the API route at `/api/products` can return data from PostgreSQL.

### Common database commands

Start the database container:

```bash
docker compose up -d
```

Stop the container while preserving data in the Docker volume:

```bash
docker compose down
```

Stop the container and delete the data volume for a full reset:

```bash
docker compose down -v
```

Regenerate the Prisma client without creating a migration:

```bash
npx prisma generate
```

### Reset the database from scratch

If you want to drop all local data and rebuild everything from scratch, use one of these two flows.

Reset only the database contents but keep the running container:

```bash
npx prisma migrate reset
```

That command drops the database, reapplies all migrations, and runs the configured seed script.

Reset both the container volume and the database contents:

```bash
docker compose down -v
docker compose up -d
npx prisma migrate dev
npm run db:seed
```

Use the Docker volume reset when you want a completely clean local Postgres instance.

### Create and run a new migration

When the Prisma schema changes, use this workflow:

1. Edit `prisma/schema.prisma`.
2. Create and apply a migration locally:

```bash
npx prisma migrate dev --name describe_change
```

3. If your change affects local sample data, rerun the seed:

```bash
npm run db:seed
```

`npx prisma migrate dev --name ...` does three things for local development:

- Creates a new migration file under `prisma/migrations/`
- Applies that migration to your local database
- Regenerates the Prisma client

If you only need to apply migrations that already exist in the repo, `npx prisma migrate dev` is enough.

## Structure

```
app/
	layout.tsx           # Root layout (App Router)
	page.tsx             # Home page
test/
	setup.js             # jest-dom matchers for Testing Library
jest.config.js         # Jest config (jsdom, setup, Next integration)
```

Notes:

- Components with state/effects use "use client".
- `@testing-library/jest-dom` extends Jest matchers for better DOM assertions.
