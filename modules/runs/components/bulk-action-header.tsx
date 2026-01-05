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
		<div className="flex items-center justify-end">
			<Button
				variant="default"
				size="sm"
				onClick={onCreateContacts}
				disabled={disabled || !hasSelection}
				className="bg-zinc-900 text-zinc-50 shadow-sm transition-all duration-200 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200"
			>
				<UserPlusIcon className="mr-2 size-4" />
				Create Contacts
			</Button>
		</div>
	)
}
