import type { CSSProperties } from 'react'
import { cn } from '@/lib/utils'

/**
 * ContourField
 * A topographic contour backdrop — the "map is the worksurface" motif.
 * Decorative only (aria-hidden). When `animate` is set and the visitor
 * hasn't asked for reduced motion, the contours draw themselves in once.
 */
export function ContourField({
  className,
  animate = false,
}: {
  className?: string
  animate?: boolean
}) {
  // Nested elevation contours + a small summit ring cluster, hand-tuned
  // to undulate like a real quad-sheet section rather than a CSS grid.
  const lines = [
    'M-40 96 C 220 40, 420 150, 660 118 S 1080 44, 1260 104',
    'M-40 176 C 200 120, 440 214, 680 182 S 1060 120, 1260 176',
    'M-40 262 C 240 210, 430 300, 700 260 S 1050 196, 1260 256',
    'M-40 350 C 210 300, 460 388, 690 350 S 1080 288, 1260 344',
    'M-40 438 C 250 392, 420 470, 700 440 S 1060 380, 1260 432',
    'M-40 524 C 220 484, 470 556, 690 528 S 1080 470, 1260 520',
  ]
  const rings = [
    'M956 250 m-26 0 a26 20 0 1 0 52 0 a26 20 0 1 0 -52 0',
    'M956 250 m-52 0 a52 40 0 1 0 104 0 a52 40 0 1 0 -104 0',
    'M956 250 m-80 0 a80 62 0 1 0 160 0 a80 62 0 1 0 -160 0',
  ]

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
      className={cn(
        'pointer-events-none absolute inset-0 h-full w-full text-[color:var(--pine)]',
        animate && 'contour-draw',
        className,
      )}
      style={{ '--draw-len': 3200 } as CSSProperties}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={1.1}
        strokeLinecap="round"
        opacity={0.16}
      >
        {lines.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <g fill="none" stroke="currentColor" strokeWidth={1.1} opacity={0.22}>
        {rings.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
    </svg>
  )
}
