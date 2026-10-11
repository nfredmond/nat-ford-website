# natfordplanning.com

Website for Nat Ford Planning & Analysis, the name Nathaniel Redmond publishes his open-source
planning software under. The site showcases OpenPlan, his free transportation and land-use
planning application, along with his other public projects. It sells nothing. It also runs a few
free tools: a contact form that feeds a lead inbox, a funding readiness scorecard, and an AI
grant-narrative drafting tool.

OpenPlan runs separately at `https://openplan-zeta.vercel.app`. A temporary 307 redirect in
`next.config.ts` sends `/openplan` to that deployment. Paths after `/openplan` and request
query parameters pass through. `/openplan/` first follows Next.js's standard 308 redirect
to `/openplan`, then follows the 307 redirect to OpenPlan. This repository has no `/openplan`
route, rewrite, or embed. Links use plain `<a>` tags so the browser loads the separate app.

## Pages

| Route | What it is |
| --- | --- |
| `/` | OpenPlan showcase: what it covers, how it is built, how to run it, who builds it |
| `/software` | The other public repositories and the free tools on this site |
| `/about` | Nathaniel's bio, county map, prior-role projects, career |
| `/contact` | Contact form and direct channels (also `/contact/openplan-updates`) |
| `/funding-readiness-scorecard` | Self-assessment tool |
| `/grant-lab` | AI grant-narrative drafting tool |
| `/ethics`, `/privacy`, `/terms` | Policies |
| `/login`, `/portal`, `/admin`, `/lead-inbox` | Authenticated areas |

Retired routes (`/services`, `/projects`, `/products`, `/open-source`, `/process`, `/faq`,
`/resources`, and the old contact subpages) redirect to their replacements. The list is in
`next.config.ts`.

The retired capability brochure at `/NFPA_Capability_OnePager.pdf` redirects to the
prior-role experience section of `/about`. The site no longer publishes that services
brochure or its outdated contact number.

The home page facts about OpenPlan come from the OpenPlan README ("What exists" table, license,
setup steps). Keep them in step with that repository. The latest release tag is fetched from the
GitHub API and refreshed hourly (`src/lib/openplan-release.ts`).

The projects on `/about` were delivered while Nathaniel was on staff at Green DOT
Transportation Solutions (2021–2025). They are prior-role experience, not Nat Ford work, and
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
- **Logo.** A guide-sign monogram ("NF" on a green panel with a white inset border) beside
  "Nat Ford / Planning & Analysis," all in Overpass and outlined to paths.
  `scripts/build_logo.py` regenerates the SVGs; its docstring lists the setup. PNGs and
  favicons are rendered from those SVGs with `rsvg-convert` and ImageMagick.
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

Public pages run without environment variables. `ENV_SETUP.md` lists every variable. The
authenticated pages, the contact form, and the grant lab need the Supabase and OpenAI values in `ENV_SETUP.md`. With the Vercel CLI linked,
`vercel env pull .env.local` fetches them.

## Checks

```bash
npm test           # commerce, catalog, internal links, contact prefill, lead routing
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

Source code is Apache-2.0. The license does not cover the Nat Ford name, logos, or
photographs. See `LICENSE-NOTICE.md`.
