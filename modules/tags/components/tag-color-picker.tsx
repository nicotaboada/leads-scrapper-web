'use client'

import { TAG_COLOR_CONFIG, TagColor } from '../types'

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
							className={`h-6 w-6 rounded-full border border-zinc-200/50 transition-all dark:border-zinc-800/50 ${
								isSelected
									? 'ring-2 ring-zinc-400 ring-offset-2 dark:ring-zinc-600'
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
					className="text-sm text-zinc-400 transition-colors hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300"
				>
					Limpiar
				</button>
			</div>
			<p className="text-muted-foreground text-xs">
				By selecting a color, the label will default to show before labels with
				no assigned color
			</p>
		</div>
	)
}
