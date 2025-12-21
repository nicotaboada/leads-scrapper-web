'use client'

import { Loader2 } from 'lucide-react'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface BulkCreateModalProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	selectedCount: number
	onConfirm: () => void
	loading: boolean
}

/**
 * Confirmation modal for bulk creating contacts
 */
export function BulkCreateModal({
	open,
	onOpenChange,
	selectedCount,
	onConfirm,
	loading,
}: BulkCreateModalProps) {
	const handleConfirm = (e: React.MouseEvent) => {
		e.preventDefault()
		onConfirm()
	}

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Create Contacts</AlertDialogTitle>
					<AlertDialogDescription>
						You are about to create{' '}
						<span className="font-semibold text-foreground">
							{selectedCount}
						</span>{' '}
						company contacts from the selected results.
						<br />
						<br />
						This action cannot be undone.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={handleConfirm} disabled={loading}>
						{loading ? (
							<>
								<Loader2 className="mr-2 size-4 animate-spin" />
								Creating...
							</>
						) : (
							'Create'
						)}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

