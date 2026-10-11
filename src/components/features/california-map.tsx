import { caCounties, caMapViewBox, grassValley } from '@/data/ca-counties'
import { cn } from '@/lib/utils'

/**
 * CaliforniaMap
 * Static county map of California. Highlighted counties are filled in
 * guide-sign green; Grass Valley is marked in signal yellow. Rendered on
 * the server as plain SVG, so it costs no client JavaScript.
 */
export function CaliforniaMap({
  highlighted,
  label,
  className,
}: {
  highlighted: readonly string[]
  label: string
  className?: string
}) {
  const set = new Set(highlighted)
  return (
    <svg viewBox={caMapViewBox} role="img" aria-label={label} className={cn('h-auto w-full', className)}>
      <g strokeLinejoin="round">
        {caCounties.map((county) => {
          const on = set.has(county.name)
          return (
            <path
              key={county.name}
              d={county.d}
              className={cn(
                on
                  ? 'fill-[color:var(--sign)] dark:fill-[color:var(--pine)]'
                  : 'fill-[color:var(--line)]',
                'stroke-[color:var(--surface)]'
              )}
              strokeWidth={0.9}
            >
              <title>{`${county.name} County`}</title>
            </path>
          )
        })}
      </g>
      <g aria-hidden="true">
        <circle cx={grassValley[0]} cy={grassValley[1]} r={5.5} fill="var(--signal)" stroke="var(--ink)" strokeWidth={1.6} />
        <text
          x={grassValley[0] + 10}
          y={grassValley[1] + 4}
          className="fill-[color:var(--ink)] font-ui text-[11px] font-bold"
          paintOrder="stroke"
          stroke="var(--paper)"
          strokeWidth={3}
        >
          Grass Valley
        </text>
      </g>
    </svg>
  )
}
