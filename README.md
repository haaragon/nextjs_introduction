# nextjs_introduction

Small playground with Next.js (App Router) and unit tests using Vitest + Testing Library.

## Requirements

- Node.js 18+ (20 recommended)
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

- Unit tests (Vitest)

```bash
npm run test        # UI/Watch (Vitest)
npm run test:watch  # Watch mode in terminal
npm run test:run    # Single run (CI)
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
vitest.config.mjs      # Vitest config (jsdom, setup, automatic JSX)
```

Notes:

- Components with state/effects use "use client".
