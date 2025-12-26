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
			if (target.isIntersecting && hasNextPage && !loading) {
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
			<div className="space-y-1">
				<ContactItemSkeleton />
				<ContactItemSkeleton />
				<ContactItemSkeleton />
				<ContactItemSkeleton />
				<ContactItemSkeleton />
			</div>
		)
	}

	if (!loading && contacts.length === 0) {
		return <FollowUpEmptyState category={category} />
	}

	return (
		<div className="space-y-1">
			{contacts.map((contact) => (
				<FollowUpContactItem key={contact.id} contact={contact} />
			))}

			{/* Infinite scroll trigger */}
			<div ref={loadMoreRef} className="h-1" />

			{/* Loading more indicator */}
			{loading && contacts.length > 0 && (
				<div className="space-y-1 pt-2">
					<ContactItemSkeleton />
					<ContactItemSkeleton />
				</div>
			)}
		</div>
	)
}

