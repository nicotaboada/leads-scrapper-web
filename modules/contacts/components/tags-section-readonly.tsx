'use client'

/**
 * Tags Section Readonly Component
 *
 * Read-only section displaying contact tags.
 * Used in both company and contact detail sidebars.
 */

import { TagChip } from 'modules/tags/components/tag-chip'
import type { ContactTag } from '../types'

interface TagsSectionReadonlyProps {
	tags?: ContactTag[]
}

export function TagsSectionReadonly({ tags }: TagsSectionReadonlyProps) {
	return (
		<div className="py-4">
			<div className="flex items-start gap-3">
				<span className="text-muted-foreground w-16 shrink-0 pt-0.5 text-sm">
					Tags
				</span>
				<div className="flex flex-1 flex-wrap gap-1.5">
					{!tags || tags.length === 0 ? (
						<span className="text-muted-foreground text-sm">Sin tags</span>
					) : (
						tags.map((tag) => (
							<TagChip
								key={tag.id}
								tag={{ id: tag.id, name: tag.name, color: tag.color ?? undefined }}
							/>
						))
					)}
				</div>
			</div>
		</div>
	)
}

