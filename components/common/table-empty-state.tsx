/**
 * Table Empty State Component
 *
 * Reusable empty state for tables with icon, text, and call-to-action
 */

import type { LucideIcon } from 'lucide-react'
import { Button } from 'components/ui/button'
import { isValidElement } from 'react'
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from 'components/ui/empty'

interface TableEmptyStateProps {
	icon: LucideIcon
	title: string
	description?: string
	action?:
		| {
				label: string
				onClick: () => void
		  }
		| React.ReactNode
}

export function TableEmptyState({
	icon: Icon,
	title,
	description,
	action,
}: TableEmptyStateProps) {
	return (
		<Empty className="border border-dashed">
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<Icon />
				</EmptyMedia>
				<EmptyTitle>{title}</EmptyTitle>
				<EmptyDescription>{description}</EmptyDescription>
			</EmptyHeader>
			{action && (
				<EmptyContent>
					{isValidElement(action) ? (
						action
					) : (
						<Button
							className="cursor-pointer"
							onClick={(action as { onClick: () => void }).onClick}
						>
							{(action as { label: string }).label}
						</Button>
					)}
				</EmptyContent>
			)}
		</Empty>
	)
}
