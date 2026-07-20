import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resources',
  description:
    'A working California transportation funding calendar (ATP, HSIP, CRP, CMAQ, FTA programs) plus downloadable planning and grant-readiness tools.',
}

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return children
}
