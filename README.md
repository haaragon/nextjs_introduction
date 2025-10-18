# nextjs_introduction

Small playground with Next.js (App Router) and unit tests using Jest + Testing Library.

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

- Unit tests (Jest)

```bash
npm run test        # Watch mode
npm run test:watch  # Watch mode explicitly
npm run test:run    # CI mode
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
