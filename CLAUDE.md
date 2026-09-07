# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A small learning/playground project for Next.js (App Router) with React 19, TypeScript, Tailwind CSS v4, Prisma + PostgreSQL, and Jest + Testing Library for unit tests.

## Commands

```bash
npm install          # install dependencies (Node 20.19, see .nvmrc)
npm run dev          # start the Next.js dev server
npm run test         # run Jest tests (watch mode by default via jest.config.js)
npm run test:watch   # explicit watch mode
npm run test:run     # CI mode (jest --ci), non-interactive
npm run test:coverage # run tests with coverage report
npm run db:seed      # seed the local database (runs prisma/seed.js)
npx tsc --noEmit -p tsconfig.json  # typecheck (no separate npm script defined)
```

Run a single test file or pattern:

```bash
npx jest app/like-button.test.tsx
npx jest -t "renders the title"
```

For local Postgres setup, reset, and migration workflows, see [README.md](README.md#database-postgresql-via-docker-local-only). Prisma implementation details (schema, generated client, seed script) live in [prisma/CLAUDE.md](prisma/CLAUDE.md).

There is no build/lint script defined in package.json — don't assume one exists. There is a `tsconfig.json`, so `npx tsc --noEmit` works for typechecking.

Pin `typescript` to the 5.x line (currently `^5.9.3`) in devDependencies — Next.js 15.5.5 bundles/expects TypeScript 5.8.x internally, and TypeScript 7 (the native/Corsa compiler) breaks `next dev`'s built-in TS integration (`Cannot read properties of undefined (reading 'endsWith')`). Do not upgrade to TS 7 until Next.js supports it.

## Architecture

- Next.js App Router lives entirely under `app/`. Each `page.tsx` in a subfolder (e.g. `app/about/page.tsx`, `app/products/page.tsx`) maps directly to a route.
- `app/layout.tsx` is the root layout: it imports global Tailwind styles (`app/globals.css`) and renders `NavBar` above `{children}` on every page.
- `app/nav-bar.tsx` defines the site navigation links in a single `links` array — add a route there to have it appear in the nav.
- Client-side interactive components (state/effects) are marked `"use client"` at the top of the file, e.g. `app/like-button.tsx`. Server components (the default) have no such directive.
- Path alias `@/*` resolves to `app/*` (configured in both `tsconfig.json` for the app and `jest.config.js`'s `moduleNameMapper` for tests) — import app modules as `@/nav-bar`, `@/globals.css`, etc. (no `.ts`/`.tsx` extension), not via relative paths.
- Styling uses Tailwind CSS v4 via the `@tailwindcss/postcss` PostCSS plugin (`postcss.config.mjs`); `app/globals.css` just contains `@import "tailwindcss";`. Plain CSS side-effect imports are declared ambiently in `app/css.d.ts` (`declare module "*.css"`) since TypeScript checks side-effect imports by default.
- `next-env.d.ts` is auto-generated/overwritten by `next dev`/`next build` — don't hand-edit it or add declarations there; it's gitignored.
- Test-only ambient types (e.g. `@testing-library/jest-dom` matcher augmentation) live in `test/jest-dom.d.ts`.
- API routes live under `app/api/**/route.ts` (Next.js Route Handlers), e.g. `app/api/products/route.ts` exports a `GET` that queries Prisma and returns `NextResponse.json(...)`. New endpoints follow this same `app/api/<name>/route.ts` convention.
- Client components fetch through the API routes rather than importing Prisma directly, e.g. `app/products/products-table.tsx` (`"use client"`) calls `fetch("/api/products", { cache: "no-store" })` from a `useEffect` and renders loading/error/data states.
- `app/lib/prisma.ts` exports a singleton `prisma` client (`PrismaClient` cached on `globalThis` outside production) — import it as `@/lib/prisma` in route handlers instead of instantiating `new PrismaClient()` per request, which would exhaust DB connections in dev due to hot reload.

## Testing

- Test files sit next to the component they cover, named `*.test.tsx`/`*.test.ts` (e.g. `app/like-button.test.tsx`, `app/nav-bar.test.tsx`, `app/layout.test.tsx`, `app/page.test.tsx`, `app/api/products/route.test.ts`).
- Jest is configured through `next/jest` in `jest.config.js`, using `jest-environment-jsdom` by default and `@testing-library/react` / `@testing-library/jest-dom`.
- `test/setup.js` is loaded via `setupFilesAfterEnv` and wires up `@testing-library/jest-dom` matchers — no need to re-import it per test file.
- API route tests (e.g. `app/api/products/route.test.ts`) add a `/** @jest-environment node */` docblock to switch that file to the Node test environment, since Route Handlers don't run in jsdom. These tests call the exported `GET`/`POST`/etc. handlers directly and mock `@/lib/prisma` with `jest.mock` (stubbing `prisma.product.findMany` etc. via `jest.fn()`) rather than hitting a real database — no running Postgres instance is required for them to pass.
- Coverage is collected from `app/**/*.{js,jsx,ts,tsx}`, excluding test files themselves.

## Environment
Node >= 20 is required (Tailwind v4's oxide binary fails on Node 18). Before installing any new dependency, run `node -v` and confirm the engine requirements in the package's docs.
