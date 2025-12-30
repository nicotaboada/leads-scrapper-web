'use client'

/**
 * Sheet component showing contacts with follow-up filtered by category
 */

import { Filter } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ScrollArea } from 'components/ui/scroll-area'
import { Separator } from 'components/ui/separator'
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from 'components/ui/sheet'
import { cn } from 'lib/utils/merge'
import { FollowUpContactList } from './follow-up-contact-list'
import { useContactsWithFollowUp } from '../hooks/use-contacts-with-follow-up'
import { FollowUpCategory } from '../types/follow-up'

interface FollowUpSheetProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	initialCategory?: FollowUpCategory
}

type CategoryOption = {
	value: FollowUpCategory
	label: string
	dotColor: string
}

const CATEGORY_OPTIONS: CategoryOption[] = [
	{
		value: FollowUpCategory.OVERDUE,
		label: 'Vencidos',
		dotColor: 'bg-zinc-950 dark:bg-zinc-100',
	},
	{
		value: FollowUpCategory.TODAY,
		label: 'Hoy',
		dotColor: 'bg-zinc-500',
	},
	{
		value: FollowUpCategory.UPCOMING,
		label: 'Próximos',
		dotColor: 'bg-zinc-300 dark:bg-zinc-600',
	},
]

/**
 * Category filter button component
 */
function CategoryButton({
	option,
	isSelected,
	onClick,
}: {
	option: CategoryOption
	isSelected: boolean
	onClick: () => void
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				'flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-semibold transition-all duration-200',
				isSelected
					? 'border-zinc-950 bg-zinc-950 text-zinc-100 shadow-sm dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-950'
					: 'border-zinc-200 bg-zinc-50 text-zinc-500 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400'
			)}
		>
			<div
				className={cn(
					'h-1.5 w-1.5 rounded-full transition-colors',
					isSelected ? 'bg-current' : option.dotColor
				)}
				aria-hidden="true"
			/>
			{option.label}
		</button>
	)
}

/**
 * Sheet displaying contacts with follow-up by category
 */
export function FollowUpSheet({
	open,
	onOpenChange,
	initialCategory = FollowUpCategory.OVERDUE,
}: FollowUpSheetProps) {
	const [selectedCategory, setSelectedCategory] =
		useState<FollowUpCategory>(initialCategory)

	// Update selectedCategory when initialCategory changes
	useEffect(() => {
		setSelectedCategory(initialCategory)
	}, [initialCategory])

	const { contacts, loading, hasNextPage, loadMore, refetch } =
		useContactsWithFollowUp(selectedCategory)

	// Refetch when sheet opens
	useEffect(() => {
		if (open) {
			refetch()
		}
	}, [open, refetch])

	// Refetch when category changes
	useEffect(() => {
		if (open) {
			refetch()
		}
	}, [selectedCategory, open, refetch])

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent
				side="right"
				className="flex h-full flex-col p-0 sm:max-w-lg"
			>
				<SheetHeader className="shrink-0 px-6 py-6">
					<SheetTitle className="text-xl font-bold">
						Contactos con follow-up
					</SheetTitle>
				</SheetHeader>

				<div className="shrink-0 px-6 pb-6">
					<div className="flex flex-col gap-4">
						<div className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
							<Filter className="h-3 w-3" />
							<span>Filtrar por estado</span>
						</div>

						<div className="flex gap-2">
							{CATEGORY_OPTIONS.map((option) => (
								<CategoryButton
									key={option.value}
									option={option}
									isSelected={selectedCategory === option.value}
									onClick={() => setSelectedCategory(option.value)}
								/>
							))}
						</div>
					</div>
				</div>

				<Separator />

				{/* Contact list with ScrollArea */}
				<ScrollArea className="min-h-0 flex-1">
					<div className="py-2">
						<FollowUpContactList
							contacts={contacts}
							loading={loading}
							hasNextPage={hasNextPage}
							category={selectedCategory}
							onLoadMore={loadMore}
						/>
					</div>
				</ScrollArea>
			</SheetContent>
		</Sheet>
	)
}
