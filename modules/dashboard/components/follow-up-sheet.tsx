'use client'

/**
 * Sheet component showing contacts with follow-up filtered by category
 */

import { useEffect, useState } from 'react'
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from 'components/ui/sheet'
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
	color: string
}

const CATEGORY_OPTIONS: CategoryOption[] = [
	{ value: FollowUpCategory.OVERDUE, label: 'Vencidos', color: 'bg-red-500' },
	{ value: FollowUpCategory.TODAY, label: 'Hoy', color: 'bg-yellow-500' },
	{
		value: FollowUpCategory.UPCOMING,
		label: 'Próximos',
		color: 'bg-green-500',
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
			className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
				isSelected
					? 'bg-primary text-primary-foreground'
					: 'bg-muted text-muted-foreground hover:bg-accent'
			}`}
		>
			<span
				className={`h-2 w-2 rounded-full ${option.color}`}
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
			<SheetContent side="right" className="w-full sm:max-w-md">
				<SheetHeader>
					<SheetTitle>Contactos con follow-up</SheetTitle>
				</SheetHeader>

			{/* Category filter */}
			<div className="flex gap-2 overflow-x-auto px-6 pb-4">
				{CATEGORY_OPTIONS.map((option) => (
					<CategoryButton
						key={option.value}
						option={option}
						isSelected={selectedCategory === option.value}
						onClick={() => setSelectedCategory(option.value)}
					/>
				))}
			</div>

			{/* Contact list */}
			<div className="flex-1 overflow-y-auto px-6">
					<FollowUpContactList
						contacts={contacts}
						loading={loading}
						hasNextPage={hasNextPage}
						category={selectedCategory}
						onLoadMore={loadMore}
					/>
				</div>
			</SheetContent>
		</Sheet>
	)
}
