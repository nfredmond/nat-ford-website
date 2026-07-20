# Nat Ford Planning & Analysis — Website

Marketing site and a small product surface for **Nat Ford Planning & Analysis**: open-source
planning software, transportation-planning services, and a couple of AI tools (a grant-narrative
lab and a planner chatbot). Next.js 16, deployed on Vercel.

> **The authoritative architecture doc is [`CLAUDE.md`](./CLAUDE.md)** — it's kept accurate and
> covers routing, the auth proxy, the Supabase client split, theming, and conventions. This README
> is the short version.

## Stack

- **Next.js 16** — App Router, Turbopack for both dev and build; React 19
- **TypeScript** (strict)
- **Tailwind CSS v4** — CSS-first config in `src/app/globals.css` (no `tailwind.config`)
- **Supabase** — Postgres + Auth + Storage; client split in `src/lib/supabase/`
- **Stripe** — checkout + signed webhook for the commerce/fulfillment path
- **Mapbox** — static-map previews via the REST API (`fetch`); no client GL library
- **lucide-react** icons

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
npm test         # behavior tests (commerce, routing, links, prefill)
```

Environment variables are documented in [`ENV_SETUP.md`](./ENV_SETUP.md). Nothing is auto-deployed
from this repo.

## Layout

```
src/
  app/
    (marketing)/   # every user-facing page — marketing, auth, portal, admin all live here
    api/           # route handlers: leads, commerce, chat, admin, maps
    globals.css    # design tokens + utilities (the "Planning Worksurface" system)
    layout.tsx     # root layout + fonts
  components/      # layout/ · ui/ · features/
  data/            # structured site content (JSON/TS) — edit here, not in components
  lib/             # supabase/ (client·server·admin·middleware) · commerce/ · auth/ · security/
  proxy.ts         # Next 16 auth proxy — gates /portal, /dashboard, /login, /signup
supabase/migrations/   # leads, ai_usage_events, commerce_fulfillment_ledger,
                       # customer_product_access, ai_abuse_controls, admin_action_log,
                       # customer_onboarding_events  (RLS on, deny-all defaults)
scripts/               # behavior tests (test-*.mjs), live smokes (*-smoke.sh), ops utils, PDF builders
```

## Testing

`npm test` runs the tests that exercise real `src/lib` logic (commerce env resolution, delivery
contract, catalog guardrail, services links, contact prefill, lead routing). There's no CI wired
up yet — run it before a release. The `scripts/*smoke*.sh` files are live end-to-end smokes to run
against a deployed URL.

## License

Private — all rights reserved. Source components carry their own license notes; see
[`LICENSE-NOTICE.md`](./LICENSE-NOTICE.md).
