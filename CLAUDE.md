# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A small learning/playground project for Next.js (App Router) with React 19, Tailwind CSS v4, and Jest + Testing Library for unit tests.

## Commands

```bash
npm install          # install dependencies (Node 20.19, see .nvmrc)
npm run dev          # start the Next.js dev server
npm run test         # run Jest tests (watch mode by default via jest.config.js)
npm run test:watch   # explicit watch mode
npm run test:run     # CI mode (jest --ci), non-interactive
npm run test:coverage # run tests with coverage report
```

Run a single test file or pattern:

```bash
npx jest app/like-button.test.jsx
npx jest -t "renders the title"
```

There is no build/lint/typecheck script defined in package.json — don't assume one exists.

## Architecture

- Next.js App Router lives entirely under `app/`. Each `page.jsx` in a subfolder (e.g. `app/about/page.jsx`, `app/products/page.jsx`) maps directly to a route.
- `app/layout.jsx` is the root layout: it imports global Tailwind styles (`app/globals.css`) and renders `NavBar` above `{children}` on every page.
- `app/nav-bar.jsx` defines the site navigation links in a single `links` array — add a route there to have it appear in the nav.
- Client-side interactive components (state/effects) are marked `"use client"` at the top of the file, e.g. `app/like-button.jsx`. Server components (the default) have no such directive.
- Path alias `@/*` resolves to `app/*` (configured in both `jsconfig.json` for the app and `jest.config.js`'s `moduleNameMapper` for tests) — import app modules as `@/nav-bar.jsx`, `@/globals.css`, etc., not via relative paths.
- Styling uses Tailwind CSS v4 via the `@tailwindcss/postcss` PostCSS plugin (`postcss.config.mjs`); `app/globals.css` just contains `@import "tailwindcss";`.

## Testing

- Test files sit next to the component they cover, named `*.test.jsx` (e.g. `app/like-button.test.jsx`, `app/nav-bar.test.jsx`, `app/layout.test.jsx`, `app/page.test.jsx`).
- Jest is configured through `next/jest` in `jest.config.js`, using `jest-environment-jsdom` and `@testing-library/react` / `@testing-library/jest-dom`.
- `test/setup.js` is loaded via `setupFilesAfterEnv` and wires up `@testing-library/jest-dom` matchers — no need to re-import it per test file.
- Coverage is collected from `app/**/*.{js,jsx,ts,tsx}`, excluding test files themselves.

## Environment
Node >= 20 is required (Tailwind v4's oxide binary fails on Node 18). Before installing any new dependency, run `node -v` and confirm the engine requirements in the package's docs.
