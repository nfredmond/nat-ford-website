import type { NextConfig } from 'next'

// Pages retired in the October 2026 redesigns. Each old URL lands on the section
// that replaced it. /openplan is not listed: it belongs to the separate
// OpenPlan app mounted at that path.
const retired: Array<[string, string]> = [
  ['/services', '/'],
  ['/services/:path*', '/'],
  ['/projects', '/about#experience'],
  ['/projects/sierra-rtp', '/about#sierra-rtp'],
  ['/projects/del-norte-atp', '/about#del-norte-atp'],
  ['/projects/tehama-vmt', '/about#tehama-vmt'],
  ['/products', '/software'],
  ['/open-source', '/software'],
  ['/process', '/'],
  ['/resources', '/software'],
  ['/faq', '/contact'],
  ['/contact/openplan-fit', '/contact'],
  ['/contact/funding-readiness', '/contact'],
]

// TEMPORARY. The OpenPlan app will be mounted at /openplan by a separate
// deployment. Until that mount exists, send visitors to the home page's
// "Run it on your own computer" section instead of a 404. Delete this
// entry in the same change that adds the /openplan rewrite or microfrontend route, because
// redirects run before rewrites and would shadow it.
const openplanPlaceholder = {
  source: '/openplan/:path*',
  destination: '/#try',
  permanent: false,
}

const nextConfig: NextConfig = {
  async redirects() {
    return [
      ...retired.map(([source, destination]) => ({ source, destination, permanent: true })),
      openplanPlaceholder,
    ]
  },
}

export default nextConfig
