'use client'

import { TagColor, TAG_COLOR_CONFIG } from '../types'

interface TagColorPickerProps {
  value?: TagColor | null
  onChange: (color: TagColor | null) => void
}

const COLORS = Object.values(TagColor)

/**
 * Color picker component with predefined color options
 */
export function TagColorPicker({ value, onChange }: TagColorPickerProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        {COLORS.map((color) => {
          const config = TAG_COLOR_CONFIG[color]
          const isSelected = value === color
          return (
            <button
              key={color}
              type="button"
              onClick={() => onChange(color)}
              className={`h-6 w-6 rounded-full transition-all ${
                isSelected
                  ? 'ring-2 ring-offset-2 ring-gray-400'
                  : 'hover:scale-110'
              }`}
              style={{ backgroundColor: config.hex }}
              title={config.label}
              aria-label={config.label}
            />
          )
        })}
        <button
          type="button"
          onClick={() => onChange(null)}
          className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          Clear
        </button>
      </div>
      <p className="text-xs text-muted-foreground">
        By selecting a color, the label will default to show before labels with
        no assigned color
      </p>
    </div>
  )
}

