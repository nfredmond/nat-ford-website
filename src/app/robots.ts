import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin',
        '/portal',
        '/dashboard',
        '/lead-inbox',
        '/login',
        '/signup',
        '/reset-password',
        '/auth/',
        '/facebook/',
        '/api/',
      ],
    },
    sitemap: 'https://www.natfordplanning.com/sitemap.xml',
  }
}
