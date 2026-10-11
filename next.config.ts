import type { NextConfig } from 'next'

// Pages retired in the October 2026 redesigns. Each old URL lands on the section
// that replaced it. /openplan redirects separately to the OpenPlan app.
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
  ['/NFPA_Capability_OnePager.pdf', '/about#experience'],
  ['/faq', '/contact'],
  ['/contact/openplan-fit', '/contact'],
  ['/contact/funding-readiness', '/contact'],
]

// OpenPlan runs on its own deployment. Preserve paths after /openplan and
// let Next.js pass request query parameters through to the destination.
const openplanRedirect = {
  source: '/openplan/:path*',
  destination: 'https://openplan-zeta.vercel.app/:path*',
  permanent: false,
}

const nextConfig: NextConfig = {
  async redirects() {
    return [
      ...retired.map(([source, destination]) => ({ source, destination, permanent: true })),
      openplanRedirect,
    ]
  },
}

export default nextConfig
