import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Grant Narrative Lab',
  description:
    'Draft and refine competitive grant narratives for ATP, HSIP, SS4A, RAISE, FTA, and TIRCP programs with an AI editor grounded in real scoring priorities.',
}

export default function GrantLabLayout({ children }: { children: React.ReactNode }) {
  return children
}
