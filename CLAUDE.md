# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # Run ESLint
```

No test runner is configured.

## Architecture

**Portally** is a mobile-first Next.js 16 / React 19 app for Rotaract members. It uses the App Router with a `(app)` route group that requires authentication.

### Auth & Data

- **Supabase** handles auth. Use `createClient` from `@/lib/supabase/server` in server components/pages, and `@/lib/supabase/client` in client components.
- The `(app)` layout (`app/(app)/layout.tsx`) gates all protected routes — it fetches the user server-side and redirects to `/` if unauthenticated.
- All application data is currently **mocked** — no database reads beyond auth. Mock data lives in `shared/mock.ts` (user, residences) and each feature's `_data/` folder.

### Route Structure

```
app/
├── page.tsx               # Auth/landing page (public)
└── (app)/                 # Protected route group
    ├── layout.tsx          # Auth gate + TopNav + BottomTabs shell
    ├── home/               # Dashboard: IdCard, next event, recent transactions
    ├── events/             # Event list + [id] detail page
    └── payments/           # Balance card, QR scanner, transaction history
```

Each feature follows the convention: `_components/` for UI, `_data/` for mock data and types.

### UI Conventions

- **shadcn/ui** components are in `components/ui/`. Add new ones with `npx shadcn add <component>`.
- Shared primitives (`Page`, `Typography`) are in `shared/components/`.
- Use `rounded-md` everywhere — no `rounded-lg`, `rounded-xl`, `rounded-2xl`, or `rounded-full`.
- Primary color is Rotaract magenta `#D41367`. Tailwind CSS 4 (no `tailwind.config.ts` — theme is defined in `globals.css`).
- Bottom navigation has three tabs: Home, Paiements, Événements.

### Pages vs Client Components

Pages are server components by default. When a page needs client state, create a separate `_components/FeatureView.tsx` marked `"use client"` and render it from the page after fetching server-side data (e.g., `userId`). See `payments/page.tsx` → `payments/_components/PaymentsView.tsx`.

### QR Code

- **Generation**: `QRCodeSVG` from `qrcode.react`. QR value is the Supabase `userId`.
- **Scanning**: `@zxing/browser` with `decodeFromConstraints`. The scanner component is always dynamically imported (`ssr: false`). Camera requires HTTPS — `navigator.mediaDevices` is undefined on plain HTTP on mobile.
