'use client'

/**
 * Leads Company Warning Modal Component
 *
 * Warning modal displayed when creating person contacts from leads.
 * Alerts users that some contacts may be created without company associations
 * if the companies haven't been created from the Overview tab first.
 */

import { AlertTriangle, Loader2 } from 'lucide-react'
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

interface LeadsCompanyWarningModalProps {
	/**
	 * Controls modal visibility
	 */
	open: boolean
	/**
	 * Callback when modal visibility changes
	 */
	onOpenChange: (open: boolean) => void
	/**
	 * Number of leads/contacts selected
	 */
	selectedCount: number
	/**
	 * Callback when user cancels
	 */
	onCancel: () => void
	/**
	 * Callback when user proceeds with creation
	 */
	onProceed: () => void
	/**
	 * Whether the creation is in progress
	 */
	loading: boolean
}

/**
 * Warning modal for creating person contacts from leads
 *
 * Displays a warning that some contacts may not have company associations
 * if the companies weren't created first from the Overview tab.
 */
export function LeadsCompanyWarningModal({
	open,
	onOpenChange,
	selectedCount,
	onCancel,
	onProceed,
	loading,
}: LeadsCompanyWarningModalProps) {
	const handleProceed = (e: React.MouseEvent) => {
		e.preventDefault()
		onProceed()
	}

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="flex items-center gap-2">
						<AlertTriangle className="size-5 text-amber-500" />
						Add Contacts
					</AlertDialogTitle>
					<AlertDialogDescription asChild>
						<div className="space-y-3">
							<p>
								You are about to create{' '}
								<span className="text-foreground font-semibold">
									{selectedCount}
								</span>{' '}
								person contacts from the selected leads.
							</p>
							<div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-amber-800 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
								<p className="text-sm">
									<strong>Note:</strong> Some contacts may be created without a
									company association if their companies haven&apos;t been
									created from the Overview tab yet.
								</p>
							</div>
							<p className="text-sm">
								To ensure all contacts are linked to their companies, create the
								companies first from the Overview tab.
							</p>
						</div>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={onCancel} disabled={loading}>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction onClick={handleProceed} disabled={loading}>
						{loading ? (
							<>
								<Loader2 className="mr-2 size-4 animate-spin" />
								Creating...
							</>
						) : (
							'Proceed Anyway'
						)}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
