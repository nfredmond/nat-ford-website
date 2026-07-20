/**
 * Button Component
 * Accessible button with variants + optional asChild rendering.
 * Colors/contrast are driven by the .btn-* classes in globals.css so
 * they stay AA-correct in both light and forest-night dark themes.
 */

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  asChild?: boolean
  children: React.ReactNode
}

const variantClass = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  outline: 'btn-outline',
  ghost: 'btn-ghost',
} as const

const sizeClass = {
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
} as const

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', asChild = false, children, ...props }, ref) => {
    const merged = cn('btn', variantClass[variant], sizeClass[size], className)

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{ className?: string }>
      return React.cloneElement(child, {
        className: cn(merged, child.props.className),
      })
    }

    return (
      <button className={merged} ref={ref} {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
