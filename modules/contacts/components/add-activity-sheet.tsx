'use client'

/**
 * Add Activity Sheet Component
 *
 * Side sheet for creating a new activity for a contact
 */

import { useState } from 'react'
import { toast } from 'sonner'
import { User } from 'lucide-react'
import { Avatar, AvatarFallback } from 'components/ui/avatar'
import { Button } from 'components/ui/button'
import { Label } from 'components/ui/label'
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from 'components/ui/sheet'
import { Textarea } from 'components/ui/textarea'
import { cn } from '@/lib/utils/merge'
import { useCurrentUser } from 'hooks/use-current-user'
import { useCreateActivity } from '../hooks/use-create-activity'
import {
	ActivityType,
	getActivityTypeConfig,
	getSelectableActivityTypes,
} from '../types/activity'

interface AddActivitySheetProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	contactId: string
	contactName: string
	onActivityCreated?: () => void
}

export function AddActivitySheet({
	open,
	onOpenChange,
	contactId,
	contactName,
	onActivityCreated,
}: AddActivitySheetProps) {
	const [selectedType, setSelectedType] = useState<ActivityType | null>(null)
	const [summary, setSummary] = useState('')
	const { createActivity, loading } = useCreateActivity()
	const { user } = useCurrentUser()

	const selectableTypes = getSelectableActivityTypes()

	function getAuthorName(): string {
		if (!user) return 'Usuario'
		// Try to get name from user metadata, fallback to email
		const metadata = user.user_metadata as { full_name?: string; name?: string }
		return metadata.full_name || metadata.name || user.email || 'Usuario'
	}

	function resetForm(): void {
		setSelectedType(null)
		setSummary('')
	}

	async function handleSubmit(): Promise<void> {
		if (!selectedType) {
			toast.error('Please select an activity type')
			return
		}
		try {
			await createActivity({
				contactId,
				activityType: selectedType,
				summary: summary.trim() || undefined,
				authorName: getAuthorName(),
			})
			toast.success('Activity logged successfully')
			resetForm()
			onOpenChange(false)
			onActivityCreated?.()
		} catch {
			toast.error('Failed to log activity. Please try again.')
		}
	}

	function handleOpenChange(isOpen: boolean): void {
		if (!isOpen) {
			resetForm()
		}
		onOpenChange(isOpen)
	}

	function getContactInitials(): string {
		const parts = contactName.split(' ')
		if (parts.length >= 2) {
			return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase()
		}
		return contactName.substring(0, 2).toUpperCase()
	}

	return (
		<Sheet open={open} onOpenChange={handleOpenChange}>
			<SheetContent className="flex flex-col sm:max-w-md">
				<SheetHeader className="border-b pb-4">
					<SheetTitle className="text-xl">Add Activity</SheetTitle>
				</SheetHeader>

				<div className="flex-1 space-y-6 overflow-y-auto p-4">
					{/* Contact Section */}
					<div className="space-y-2">
						<Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
							Contact
						</Label>
						<div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
							<Avatar className="size-10">
								<AvatarFallback className="bg-stone-200 text-stone-700">
									{getContactInitials() || <User className="size-5" />}
								</AvatarFallback>
							</Avatar>
							<span className="font-medium">{contactName}</span>
						</div>
					</div>

					{/* Activity Type Section */}
					<div className="space-y-3">
						<Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
							Activity Type
						</Label>
						<div className="flex flex-wrap gap-2">
							{selectableTypes.map((type) => {
								const config = getActivityTypeConfig(type)
								const isSelected = selectedType === type
								return (
									<Button
										key={type}
										type="button"
										variant="outline"
										size="sm"
										className={cn(
											'transition-all',
											isSelected &&
												'border-green-500 bg-green-500 text-white hover:bg-green-600 hover:text-white'
										)}
										onClick={() => setSelectedType(type)}
									>
										{config.label}
									</Button>
								)
							})}
						</div>
					</div>

					{/* Summary Section */}
					<div className="space-y-2">
						<Label
							htmlFor="summary"
							className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
						>
							Summary (Optional)
						</Label>
						<Textarea
							id="summary"
							placeholder="Enter Summary"
							value={summary}
							onChange={(e) => setSummary(e.target.value)}
							rows={4}
							className="resize-none"
						/>
					</div>
				</div>

				<SheetFooter className="border-t pt-4">
					<Button
						onClick={handleSubmit}
						disabled={!selectedType || loading}
						className="w-full"
					>
						{loading ? 'Submitting...' : 'Submit'}
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}

