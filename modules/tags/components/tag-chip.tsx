'use client'

import { X } from 'lucide-react'
import { TAG_COLOR_CONFIG, type TagColor } from '../types'

/**
 * Minimal tag interface for the chip display
 */
interface TagChipTag {
	id: string
	name: string
	color?: TagColor | null
}

interface TagChipProps {
	tag: TagChipTag
	onRemove?: (tagId: string) => void
	disabled?: boolean
	size?: 'sm' | 'default'
}

const SIZE_CLASSES = {
	sm: {
		container: 'gap-1 rounded px-1.5 py-0.5 text-xs',
		dot: 'h-2 w-2',
	},
	default: {
		container: 'gap-1.5 rounded-md px-2 py-1 text-sm',
		dot: 'h-2.5 w-2.5',
	},
} as const

/**
 * Individual tag chip with color and optional remove button
 */
export function TagChip({ tag, onRemove, disabled, size = 'default' }: TagChipProps) {
	const colorConfig = tag.color ? TAG_COLOR_CONFIG[tag.color as TagColor] : null
	const isRemovable = onRemove && !disabled
	const sizeClasses = SIZE_CLASSES[size]

	return (
		<span
			className={`bg-secondary inline-flex items-center ${sizeClasses.container}`}
			style={
				colorConfig
					? { backgroundColor: `${colorConfig.hex}20`, color: colorConfig.hex }
					: undefined
			}
		>
			{colorConfig && (
				<span
					className={`${sizeClasses.dot} shrink-0 rounded-sm`}
					style={{ backgroundColor: colorConfig.hex }}
				/>
			)}
			<span className="truncate">{tag.name}</span>
			{isRemovable && (
				<span
					role="button"
					tabIndex={0}
					onClick={(e) => {
						e.stopPropagation()
						onRemove(tag.id)
					}}
					onKeyDown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault()
							e.stopPropagation()
							onRemove(tag.id)
						}
					}}
					className="ml-0.5 shrink-0 cursor-pointer rounded-sm opacity-70 hover:opacity-100 focus:outline-none"
					aria-label={`Remover ${tag.name}`}
				>
					<X className="h-3 w-3" />
				</span>
			)}
		</span>
	)
}
