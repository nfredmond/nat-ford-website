import type { NextConfig } from 'next'

// Pages retired in the 2026 redesign. Each old URL lands on the section
// that replaced it. /openplan is not listed: it belongs to the separate
// OpenPlan app mounted at that path.
const retired: Array<[string, string]> = [
  ['/services/planning', '/services#planning'],
  ['/services/grants', '/services#planning'],
  ['/services/gis', '/services#mapping'],
  ['/services/aerial', '/services#mapping'],
  ['/services/ai', '/services#software'],
  ['/projects/sierra-rtp', '/projects#sierra-rtp'],
  ['/projects/del-norte-atp', '/projects#del-norte-atp'],
  ['/projects/tehama-vmt', '/projects#tehama-vmt'],
  ['/products', '/software'],
  ['/open-source', '/software'],
  ['/process', '/services'],
  ['/resources', '/services'],
  ['/faq', '/contact'],
]

const nextConfig: NextConfig = {
  async redirects() {
    return retired.map(([source, destination]) => ({ source, destination, permanent: true }))
  },
}

export default nextConfig
