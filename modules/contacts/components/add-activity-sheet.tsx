'use client'

/**
 * Add Activity Sheet Component
 *
 * Side sheet for creating a new activity for a contact
 */

import { Sparkles, User } from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils/merge'
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

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.08,
		},
	},
}

const itemVariants = {
	hidden: { opacity: 0, x: 20 },
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.3,
		},
	},
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
			<SheetContent className="flex flex-col border-l border-zinc-200 p-0 sm:max-w-md dark:border-zinc-800">
				<SheetHeader className="border-b border-zinc-100 p-6 dark:border-zinc-900">
					<SheetTitle className="text-xl">Add Activity</SheetTitle>
				</SheetHeader>

				<motion.div
					className="flex-1 space-y-8 overflow-y-auto p-6"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					{/* Contact Section */}
					<motion.div variants={itemVariants} className="space-y-3">
						<Label className="text-sm font-medium text-zinc-500">Contact</Label>
						<div className="flex items-center gap-4 rounded-xl border border-zinc-100 bg-zinc-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-900/30">
							<Avatar className="size-12 border-2 border-white shadow-sm dark:border-zinc-800">
								<AvatarFallback className="bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900">
									{getContactInitials() || <User className="size-6" />}
								</AvatarFallback>
							</Avatar>
							<span className="leading-tight font-medium text-zinc-900 dark:text-zinc-100">
								{contactName}
							</span>
						</div>
					</motion.div>

					{/* Activity Type Section */}
					<motion.div variants={itemVariants} className="space-y-4">
						<Label className="text-sm font-medium text-zinc-500">
							Activity Type
						</Label>
						<div className="grid grid-cols-2 gap-2">
							{selectableTypes.map((type) => {
								const config = getActivityTypeConfig(type)
								const isSelected = selectedType === type
								return (
									<button
										key={type}
										type="button"
										onClick={() => setSelectedType(type)}
										className={cn(
											'flex items-center justify-center rounded-lg border px-3 py-2 text-sm shadow-sm transition-all',
											isSelected
												? 'border-zinc-900 bg-zinc-900 font-medium text-zinc-50 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900'
												: 'border-zinc-200 bg-white text-zinc-500 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-500 dark:hover:border-zinc-700'
										)}
									>
										{config.label}
									</button>
								)
							})}
						</div>
					</motion.div>

					{/* Summary Section */}
					<motion.div variants={itemVariants} className="space-y-3">
						<Label
							htmlFor="summary"
							className="text-sm font-medium text-zinc-500"
						>
							Summary (Optional)
						</Label>
						<Textarea
							id="summary"
							placeholder="Describe the interaction details..."
							value={summary}
							onChange={(e) => setSummary(e.target.value)}
							rows={5}
							className="resize-none rounded-xl border-zinc-200 bg-white p-4 text-sm text-zinc-900 focus:ring-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:ring-zinc-100"
						/>
					</motion.div>
				</motion.div>

				<SheetFooter className="border-t border-zinc-100 bg-zinc-50/30 p-6 dark:border-zinc-900 dark:bg-zinc-900/10">
					<Button
						onClick={handleSubmit}
						disabled={!selectedType || loading}
						className="h-11 w-full gap-2 bg-zinc-900 text-zinc-50 shadow-md hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
					>
						{loading ? (
							<>Submitting...</>
						) : (
							<>
								<Sparkles className="size-4" />
								Log Activity
							</>
						)}
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}
