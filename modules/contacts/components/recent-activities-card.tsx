'use client'

/**
 * Recent Activities Card Component
 *
 * Displays the most recent activity for a contact in a HubSpot-style card.
 * Shows activity type icon, description, and date.
 */

import {
	FileText,
	HelpCircle,
	History,
	Linkedin,
	Mail,
	MessageCircle,
	MessageSquare,
	RefreshCw,
} from 'lucide-react'
import { EmptyState } from 'components/common/empty-state'
import { Card } from 'components/ui/card'
import { Skeleton } from 'components/ui/skeleton'
import { cn } from 'lib/utils/merge'
import { useActivities } from '../hooks/use-activities'
import { ActivityType, getActivityTypeConfig } from '../types/activity'

interface RecentActivitiesCardProps {
	contactId: string
	contactName: string
}

const iconComponents: Record<string, React.ElementType> = {
	MessageCircle,
	Mail,
	Linkedin,
	MessageSquare,
	FileText,
	RefreshCw,
}

/**
 * Get the action verb for an activity type
 */
function getActivityActionVerb(type: ActivityType): string {
	const verbs: Record<ActivityType, string> = {
		[ActivityType.WHATSAPP_SENT]: 'sent a WhatsApp to',
		[ActivityType.EMAIL_SENT]: 'sent an email to',
		[ActivityType.LINKEDIN_MESSAGE_SENT]: 'sent a LinkedIn message to',
		[ActivityType.LEAD_REPLIED]: 'received a reply from',
		[ActivityType.NOTE]: 'added a note for',
		[ActivityType.STATUS_CHANGED]: 'changed status for',
	}
	return verbs[type]
}

/**
 * Format date for display (e.g., "April 19, 2023")
 */
function formatActivityDate(dateString: string): string {
	const date = new Date(dateString)
	return date.toLocaleDateString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	})
}

export function RecentActivitiesCard({
	contactId,
	contactName,
}: RecentActivitiesCardProps) {
	const { activities, loading, error } = useActivities({
		contactId,
		limit: 1,
	})

	const recentActivity = activities[0]

	return (
		<Card className="border-zinc-200 p-6 shadow-sm dark:border-zinc-800">
			{/* Header */}
			<div className="mb-4 flex items-center justify-between gap-2">
				<div className="flex items-center gap-2">
					<h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
						Recent communications
					</h3>
					<HelpCircle className="size-4 text-zinc-400 dark:text-zinc-500" />
				</div>
			</div>

			{/* Content */}
			{loading ? (
				<RecentActivitiesCardSkeleton />
			) : error ? (
				<p className="sm text-red-500 italic">
					Error loading recent activities
				</p>
			) : recentActivity ? (
				<div className="flex items-center justify-between gap-4 rounded-lg border border-zinc-100 bg-zinc-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-900/30">
					<div className="flex items-center gap-3">
						{/* Activity type icon */}
						<ActivityIcon type={recentActivity.activityType} />

						{/* Activity description */}
						<div className="flex flex-col">
							<p className="text-sm leading-tight">
								<span className="font-semibold text-zinc-900 dark:text-zinc-100">
									{recentActivity.authorName}
								</span>{' '}
								<span className="text-zinc-500 dark:text-zinc-400">
									{getActivityActionVerb(recentActivity.activityType)}
								</span>{' '}
								<span className="font-semibold text-zinc-900 dark:text-zinc-100">
									{contactName}
								</span>
							</p>
							<span className="mt-1 text-[11px] font-medium text-zinc-400 dark:text-zinc-500">
								{formatActivityDate(recentActivity.createdAt)}
							</span>
						</div>
					</div>
				</div>
			) : (
				<EmptyState
					icon={History}
					title="No recent communications"
					description="Toda la actividad reciente con este contacto aparecerá aquí."
					className="py-6"
				/>
			)}
		</Card>
	)
}

/**
 * Activity type icon component
 */
function ActivityIcon({ type }: { type: ActivityType }) {
	const config = getActivityTypeConfig(type)
	const IconComponent = iconComponents[config.icon] ?? FileText

	return (
		<div
			className={cn(
				'flex size-10 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950'
				// We ignore the config.bgColor to keep it grayscale
			)}
		>
			<IconComponent className="size-5 text-zinc-600 dark:text-zinc-400" />
		</div>
	)
}

/**
 * Loading skeleton for recent activities card
 */
function RecentActivitiesCardSkeleton() {
	return (
		<div className="flex items-center gap-3">
			<Skeleton className="size-8 rounded" />
			<div className="flex-1 space-y-1">
				<Skeleton className="h-4 w-64" />
			</div>
			<Skeleton className="h-4 w-24" />
		</div>
	)
}