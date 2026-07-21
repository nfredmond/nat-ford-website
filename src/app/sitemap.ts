import type { MetadataRoute } from 'next'

const BASE = 'https://www.natfordplanning.com'

const routes: Array<{ path: string; priority: number }> = [
  { path: '/', priority: 1 },
  { path: '/openplan', priority: 0.9 },
  { path: '/products', priority: 0.9 },
  { path: '/services', priority: 0.9 },
  { path: '/open-source', priority: 0.8 },
  { path: '/projects', priority: 0.8 },
  { path: '/services/planning', priority: 0.8 },
  { path: '/services/gis', priority: 0.8 },
  { path: '/services/aerial', priority: 0.8 },
  { path: '/services/grants', priority: 0.8 },
  { path: '/services/ai', priority: 0.8 },
  { path: '/about', priority: 0.7 },
  { path: '/contact', priority: 0.7 },
  { path: '/grant-lab', priority: 0.7 },
  { path: '/funding-readiness-scorecard', priority: 0.6 },
  { path: '/resources', priority: 0.6 },
  { path: '/projects/sierra-rtp', priority: 0.6 },
  { path: '/projects/del-norte-atp', priority: 0.6 },
  { path: '/projects/tehama-vmt', priority: 0.6 },
  { path: '/process', priority: 0.5 },
  { path: '/faq', priority: 0.5 },
  { path: '/ethics', priority: 0.5 },
  { path: '/contact/funding-readiness', priority: 0.4 },
  { path: '/contact/openplan-fit', priority: 0.4 },
  { path: '/contact/openplan-updates', priority: 0.4 },
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
