import type { MetadataRoute } from 'next'

const BASE = 'https://www.natfordplanning.com'

// /openplan is served by the separate OpenPlan app and lists its own pages.
const routes: Array<{ path: string; priority: number }> = [
  { path: '/', priority: 1 },
  { path: '/services', priority: 0.9 },
  { path: '/projects', priority: 0.8 },
  { path: '/software', priority: 0.8 },
  { path: '/about', priority: 0.8 },
  { path: '/contact', priority: 0.7 },
  { path: '/grant-lab', priority: 0.6 },
  { path: '/funding-readiness-scorecard', priority: 0.6 },
  { path: '/ethics', priority: 0.4 },
  { path: '/contact/funding-readiness', priority: 0.3 },
  { path: '/contact/openplan-fit', priority: 0.3 },
  { path: '/contact/openplan-updates', priority: 0.3 },
  { path: '/privacy', priority: 0.2 },
  { path: '/terms', priority: 0.2 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority }) => ({
    url: `${BASE}${path}`,
    changeFrequency: 'monthly',
    priority,
  }))
}
