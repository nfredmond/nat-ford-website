# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev`: Next.js dev server (Turbopack) at http://localhost:3000
- `npm run build`: Production build (Turbopack)
- `npm run start`: Run the production build
- `npm run lint`: ESLint (uses `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript`)

`npm test` runs the behavior tests in `scripts/test-*.mjs`, including `test-internal-links.mjs`, which fails on any internal link without a matching route, redirect, or public file. Live smoke checks also live in `scripts/`:

- `scripts/lead-intake-smoke-check.sh`: exercises the public lead form end-to-end
- `scripts/stripe-checkout-smoke.sh`: Stripe checkout smoke test
- `scripts/check-commerce-webhook-health.mjs`: verifies the Stripe webhook is alive
- `scripts/provision-product-access.mjs`: manual access provisioning fallback

`scripts/build_funding_readiness_scorecard_pdf.py` regenerates the funding readiness worksheet in `public/`. The retired capability brochure and its builder are removed. Its old URL redirects to `/about#experience`.

Supabase CLI: migrations live in `supabase/migrations/` and are applied with `supabase db push` against the project named in `supabase/config.toml`. Apply migrations in numeric order: they assume strict sequencing.

## Architecture

### Stack

Next.js 16 App Router (Turbopack-only, both dev and build) on React 19, Tailwind CSS v4 (CSS-first config in `globals.css`, no `tailwind.config`), TypeScript strict mode, Supabase (Postgres + Auth + Storage), Stripe for checkout, Mapbox GL JS, lucide-react icons. Path alias `@/*` → `src/*`.

### Routing layout

Single route group `src/app/(marketing)/` holds nearly every user-facing page: marketing site, auth pages, client portal, admin, lead-inbox, products, grant-lab, dashboard, etc. The group exists to share the marketing layout (Header/Footer); auth-protected sections still live inside it and are gated by middleware, not by being in a separate route group. API routes are under `src/app/api/`.

### Auth + the proxy

This project uses Next.js 16's `proxy.ts` (not `middleware.ts`) at `src/proxy.ts`. It calls `updateSession` from `src/lib/supabase/middleware.ts` and currently matches `/portal/*`, `/dashboard/*`, `/login`, `/signup`. **When adding a new authenticated route, update the `matcher` in `src/proxy.ts`**: putting a page under `(marketing)` does not auto-protect it.

Supabase clients are split by execution context, and the split matters:

- `src/lib/supabase/client.ts`: browser client (`'use client'` components only)
- `src/lib/supabase/server.ts`: Server Components / Server Actions / Route Handlers
- `src/lib/supabase/admin.ts`: service-role client; server-only, never import from client code
- `src/lib/supabase/middleware.ts`: used exclusively by `proxy.ts` for cookie refresh

Admin-area access checks go through `src/lib/auth/admin-access.ts` and audit logs via `src/lib/auth/admin-audit.ts` (writes to the `admin_action_log` table).

### Theming

Light/dark is class-based (`.dark` on `<html>`), not media-query driven. The toggle is set early by `src/app/theme-script.tsx` injected in `<head>` to prevent flash. Tailwind's dark variant is rebound in `globals.css`:

```css
@custom-variant dark (&:where(.dark, .dark *));
```

The design system ("Right of way") takes its vocabulary from the road. Colors are CSS variables redefined under `.dark`: `--paper`, `--surface`, `--surface-2`, `--ink`, `--muted`, `--line`, `--sign` (guide-sign green), `--signal` (warning yellow, non-text on light backgrounds), `--asphalt`. Older names (`--pine`, `--copper`, `--sand`, `--fog`) remain as aliases so the utility pages still render. Reference them as `bg-[color:var(--sign)]` rather than hard-coded hex. Fonts are Overpass (headings and interface, `font-ui`) and Source Serif 4 (reading text, the body default), loaded via `next/font/google` in `src/app/layout.tsx`. The font variables sit on `<html>` so the `:root` tokens can resolve them. Custom classes live in `@layer components` so Tailwind utilities override them.

Signature pieces: `.guide-sign` (the home hero), `SignArrow` (MUTCD arrow), `.centerline` (double yellow line above the footer, used once), `CaliforniaMap` (static county SVG from `src/data/ca-counties.ts`).

Copy rules: sentence case, no all-caps tracked labels, no em dashes. Refer to the owner as "Nathaniel" or "Nathaniel Redmond," never "Nat." Prior-role projects in `src/data/experience.ts` must stay attributed to Green DOT Transportation Solutions.

### Site purpose

Nat Ford Planning & Analysis no longer sells services. The site showcases OpenPlan (the home page) and Nathaniel's other open-source projects. Do not add service pages, pricing, or sales calls to action. OpenPlan facts on the home page come from the OpenPlan repository README; keep them in step.

### OpenPlan

OpenPlan is a separate app mounted at `/openplan` on the same domain. Do not add a `/openplan` route here, and link to it with a plain `<a>`, not `next/link`. Until the mount exists, `next.config.ts` holds a temporary `/openplan` redirect; remove it in the same change that adds the mount, because redirects run before rewrites. The placeholder currently points to `/#try`.

### Components

- `src/components/layout/`: `Header`, `Footer`, `Container`, `Section`, `Grid` (the page chrome primitives)
- `src/components/ui/`: `Button`, `Card`, `Input`, `Textarea`, `ThemeToggle`
- `src/components/features/` and `src/components/auth/`: feature-scoped pieces
- `cn()` lives in `src/lib/utils.ts` (clsx + tailwind-merge). Use it for conditional classes.

### Static content

Structured site data lives in `src/data/` as JSON/TS (`experience.ts`, `open-source-projects.ts`, `projects.json`, `services.json`, `organization.json`, `funding-readiness-scorecard.ts`, `admin-project-status.json`, `ca-counties.ts`). Edit these rather than hardcoding copy in components when the content is shared across pages or used in JSON-LD. `organization.json` is the schema.org Organization payload: its `logo` URL must point to a real public asset.

### Brand assets

The logo is a guide-sign panel: a green (`#0B5E3E`) rounded square with a white inset border and "NF" in Overpass Black, beside "Nat Ford" (Overpass ExtraBold) and "Planning & Analysis" (Overpass SemiBold). All text is outlined to paths, so the SVGs need no fonts. `scripts/build_logo.py` generates every SVG; do not hand-edit the path data. Files in `public/logos/`: `nf-wordmark-{light,dark}.{svg,png}` and `nf-monogram-square-{light,dark}.{svg,png}` (the monogram is identical in both; the names are kept for existing references). The header and footer use the wordmark SVGs. Favicons at the App Router conventional paths: `src/app/favicon.ico` (16, 32, 48 px, from the borderless small monogram), `src/app/icon.png` (512 px), `src/app/apple-icon.png` (180 px, square corners because iOS applies its own mask). Naming: "Light" = for light backgrounds, "Dark" = for dark backgrounds. The funding readiness worksheet in `public/` still carries the previous logo.

### Vercel / Next 16 notes

Default to Server Components; add `'use client'` only when you need interactivity. Use `proxy.ts` (Next 16 convention), not `middleware.ts`. Prefer `next/image`, `next/font`, and platform-native integrations over custom workarounds.
