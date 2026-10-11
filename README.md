# natfordplanning.com

Website for Nat Ford Planning & Analysis, the transportation planning practice of Nathaniel
Redmond in Grass Valley, California. It presents the services, prior planning experience, and the
open-source software, and it runs a few working tools: a contact form that feeds a lead inbox, a
funding readiness scorecard, and an AI grant-narrative drafting tool.

OpenPlan is a separate application. It is deployed on its own and mounted at
`natfordplanning.com/openplan`. This repository has no `/openplan` route, and links to it are
plain `<a>` tags so the browser does a full page load into the other app. Until that mount
exists, a temporary redirect in `next.config.ts` sends `/openplan` to the OpenPlan section of
`/software`. Remove it when the mount goes in.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Home: guide-sign hero, intro, three service areas, county map, OpenPlan, contact |
| `/services` | Planning and funding, GIS and aerial mapping, open-source software |
| `/projects` | Experience: county map, six prior-role projects, career history |
| `/software` | OpenPlan and the other public repositories, plus paid support options |
| `/about` | Bio, credentials, career |
| `/contact` | Contact form (also `/contact/openplan-fit`, `/openplan-updates`, `/funding-readiness`) |
| `/funding-readiness-scorecard` | Self-assessment tool |
| `/grant-lab` | AI grant-narrative drafting tool |
| `/ethics`, `/privacy`, `/terms` | Policies |
| `/login`, `/portal`, `/admin`, `/lead-inbox` | Authenticated areas |

Routes retired in the 2026 redesign (`/products`, `/open-source`, `/services/*`, `/projects/*`,
`/process`, `/faq`, `/resources`) redirect to their replacements. The list is in `next.config.ts`.

The projects on `/projects` were delivered while Nathaniel was on staff at Green DOT
Transportation Solutions (2021–2025). They are prior-role experience, not firm client work, and
every page that shows them says so. Keep that attribution if you edit `src/data/experience.ts`.

## Design system

The look comes from the road itself. The tokens live in `src/app/globals.css`.

- **Color.** Concrete-white page (`--paper`), MUTCD guide-sign green (`--sign`) for the brand
  surface, warning yellow (`--signal`) used only for the footer centerline, focus rings on dark
  surfaces, and the map marker, and asphalt (`--asphalt`) for the footer. Dark mode is
  class-based (`.dark` on `<html>`).
- **Type.** Overpass, a descendant of the FHWA Highway Gothic sign alphabet, sets headings and
  interface text. Source Serif 4 sets reading text. Both load through `next/font` in
  `src/app/layout.tsx`.
- **Signature elements.** The home hero is a guide sign (`.guide-sign`) whose exits are the main
  links, using the broad-headed MUTCD arrow in `src/components/features/sign-arrow.tsx`. The
  double yellow centerline (`.centerline`) appears once, above the footer.
- **County map.** `src/components/features/california-map.tsx` renders a static SVG from
  `src/data/ca-counties.ts`, which holds U.S. Census Bureau county boundaries (`us-atlas`,
  `counties-10m`) projected to California Albers. Regenerate that file with a script; do not
  hand-edit the path data.
- **Writing.** Plain, specific, sentence case, no em dashes, no all-caps labels. Refer to the
  owner as "Nathaniel," never "Nat."

## Stack

Next.js 16 (App Router, Turbopack), React 19, TypeScript (strict), Tailwind CSS v4, Supabase
(Postgres, Auth, Storage), Stripe (checkout and signed webhook), and OpenAI for the grant lab.
`CLAUDE.md` covers the architecture in more depth: the auth proxy, the Supabase client split,
and conventions.

## Local development

```bash
npm install
npm run dev     # http://localhost:3000
```

Public pages run without environment variables. `ENV_SETUP.md` lists every variable. The authenticated pages, the contact form, and
the grant lab need the Supabase and OpenAI values in `ENV_SETUP.md`. With the Vercel CLI linked,
`vercel env pull .env.local` fetches them.

## Checks

```bash
npm test           # behavior tests for commerce, catalog, links, contact prefill, lead routing
npx tsc --noEmit   # type-check
npm run lint
npm run build
```

CI (`.github/workflows/ci.yml`) runs the first three on every push and pull request. The
`scripts/*smoke*.sh` files are end-to-end checks to run against a deployed URL.

## Deployment

Vercel builds every push. Pull requests get a preview URL, and merges to `main` deploy to
production at www.natfordplanning.com.

Database migrations in `supabase/migrations/` are applied by hand with `supabase db push`, in
numeric order.

## License

Source code is Apache-2.0. The license does not cover the Nat Ford name, logos, photographs, or
client materials. See `LICENSE-NOTICE.md`.
