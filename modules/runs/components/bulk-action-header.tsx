'use client'

import { UserPlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface BulkActionHeaderProps {
	selectedCount: number
	onCreateContacts: () => void
	disabled?: boolean
}

/**
 * Header bar showing selection count and bulk action buttons
 */
export function BulkActionHeader({
	selectedCount,
	onCreateContacts,
	disabled = false,
}: BulkActionHeaderProps) {
	const hasSelection = selectedCount > 0

	return (
		<div className="flex items-center justify-between">
			<div className="text-sm text-muted-foreground">
				{hasSelection ? (
					<span className="font-medium text-foreground">
						{selectedCount} selected
					</span>
				) : (
					<span>No items selected</span>
				)}
			</div>

			{hasSelection && (
				<Button
					variant="default"
					size="sm"
					onClick={onCreateContacts}
					disabled={disabled}
				>
					<UserPlusIcon className="mr-2 size-4" />
					Create Contacts
				</Button>
			)}
		</div>
	)
}

