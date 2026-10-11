import { cn } from '@/lib/utils'

/**
 * SignArrow
 * The broad-headed arrow from MUTCD guide signs. "up" means straight
 * ahead (continue down the page); "exit" is the up-right exit arrow
 * (leaves for another section or app).
 */
export function SignArrow({
  direction = 'up',
  className,
}: {
  direction?: 'up' | 'exit' | 'right'
  className?: string
}) {
  const rotation = direction === 'exit' ? 45 : direction === 'right' ? 90 : 0
  return (
    <svg
      viewBox="0 0 32 40"
      aria-hidden="true"
      focusable="false"
      className={cn('shrink-0', className)}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <path d="M16 0 L32 17 L21.5 17 L21.5 40 L10.5 40 L10.5 17 L0 17 Z" fill="currentColor" />
    </svg>
  )
}
