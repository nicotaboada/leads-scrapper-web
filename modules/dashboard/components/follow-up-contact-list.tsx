'use client'

/**
 * Contact list with infinite scroll for follow-up sheet
 */

import { useEffect, useRef, useCallback } from 'react'
import { Skeleton } from 'components/ui/skeleton'
import { FollowUpContactItem } from './follow-up-contact-item'
import { FollowUpEmptyState } from './follow-up-empty-state'
import type { ContactWithFollowUp } from '../types/follow-up'

interface FollowUpContactListProps {
	contacts: ContactWithFollowUp[]
	loading: boolean
	hasNextPage: boolean
	category: string
	onLoadMore: () => void
}

/**
 * Loading skeleton for contact items
 */
function ContactItemSkeleton() {
	return (
		<div className="flex items-center gap-3 px-3 py-3">
			<Skeleton className="h-10 w-10 rounded-full" />
			<Skeleton className="h-4 w-40" />
		</div>
	)
}

/**
 * Contact list with infinite scroll support
 */
export function FollowUpContactList({
	contacts,
	loading,
	hasNextPage,
	category,
	onLoadMore,
}: FollowUpContactListProps) {
	const loadMoreRef = useRef<HTMLDivElement>(null)

	const handleObserver = useCallback(
		(entries: IntersectionObserverEntry[]) => {
			const target = entries[0]
			if (target && target.isIntersecting && hasNextPage && !loading) {
				onLoadMore()
			}
		},
		[hasNextPage, loading, onLoadMore]
	)

	useEffect(() => {
		const option = {
			root: null,
			rootMargin: '20px',
			threshold: 0,
		}
		const observer = new IntersectionObserver(handleObserver, option)
		if (loadMoreRef.current) {
			observer.observe(loadMoreRef.current)
		}
		return () => observer.disconnect()
	}, [handleObserver])

	if (loading && contacts.length === 0) {
		return (
			<div className="flex flex-col">
				<ContactItemSkeleton />
				<div className="mx-6 h-px bg-zinc-100 dark:bg-zinc-800/50" />
				<ContactItemSkeleton />
				<div className="mx-6 h-px bg-zinc-100 dark:bg-zinc-800/50" />
				<ContactItemSkeleton />
			</div>
		)
	}

	if (!loading && contacts.length === 0) {
		return <FollowUpEmptyState category={category} />
	}

	return (
		<div className="flex flex-col">
			{contacts.map((contact, index) => (
				<div key={contact.id}>
					<FollowUpContactItem contact={contact} />
					{index < contacts.length - 1 && (
						<div className="mx-6 h-px bg-zinc-100 dark:bg-zinc-800/50" />
					)}
				</div>
			))}

			{/* Infinite scroll trigger */}
			<div ref={loadMoreRef} className="h-1" />

			{/* Loading more indicator */}
			{loading && contacts.length > 0 && (
				<div className="flex flex-col pt-2">
					<ContactItemSkeleton />
				</div>
			)}
		</div>
	)
}

