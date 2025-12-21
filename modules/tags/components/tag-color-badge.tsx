'use client'

import { TagColor, TAG_COLOR_CONFIG } from '../types'

interface TagColorBadgeProps {
  color?: TagColor | null
  size?: 'sm' | 'md'
}

/**
 * Displays a colored circle representing a tag's color
 */
export function TagColorBadge({ color, size = 'md' }: TagColorBadgeProps) {
  if (!color) {
    return (
      <div
        className={`rounded-full border-2 border-dashed border-gray-300 ${
          size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'
        }`}
        title="Sin color"
      />
    )
  }
  const config = TAG_COLOR_CONFIG[color]
  return (
    <div
      className={`rounded-full ${size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'}`}
      style={{ backgroundColor: config.hex }}
      title={config.label}
    />
  )
}

