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

1. Copy the example env file and adjust values if needed:

```bash
cp .env.example .env
```

2. Start the database container:

```bash
docker compose up -d
```

3. Stop the container (data is preserved in a Docker volume):

```bash
docker compose down
```

4. Stop the container and delete the data volume (full reset):

```bash
docker compose down -v
```

The connection string is read from `DATABASE_URL` in `.env`, e.g.:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/nextjs_introduction"
```

## Structure

```
app/
	layout.jsx           # Root layout (App Router)
	page.jsx             # Home page
	like-button.jsx      # Example component ("use client")
	like-button.test.jsx # Component unit tests
test/
	setup.js             # jest-dom matchers for Testing Library
jest.config.js         # Jest config (jsdom, setup, Next integration)
```

Notes:

- Components with state/effects use "use client".
- `@testing-library/jest-dom` extends Jest matchers for better DOM assertions.
