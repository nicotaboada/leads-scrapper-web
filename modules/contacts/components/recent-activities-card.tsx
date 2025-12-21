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
	Linkedin,
	Mail,
	MessageCircle,
	MessageSquare,
	RefreshCw,
} from 'lucide-react'
import Link from 'next/link'
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
		<Card className="p-6">
			{/* Header */}
			<div className="mb-4 flex items-center gap-2">
				<h3 className="text-base font-semibold">Recent communications</h3>
				<HelpCircle className="text-muted-foreground size-4" />
			</div>

			{/* Content */}
			{loading ? (
				<RecentActivitiesCardSkeleton />
			) : error ? (
				<p className="text-muted-foreground text-sm">
					Error loading recent activities
				</p>
			) : recentActivity ? (
				<div className="flex items-center justify-between gap-4">
					<div className="flex items-center gap-3">
						{/* Activity type icon */}
						<ActivityIcon type={recentActivity.activityType} />

						{/* Activity description */}
						<p className="text-sm">
							<span className="text-muted-foreground">
								{recentActivity.authorName}
							</span>{' '}
							{getActivityActionVerb(recentActivity.activityType)}{' '}
							<Link
								href="#"
								className="font-medium text-teal-600 hover:underline dark:text-teal-400"
							>
								{contactName}
							</Link>
						</p>
					</div>

					{/* Date */}
					<span className="text-muted-foreground shrink-0 text-sm">
						{formatActivityDate(recentActivity.createdAt)}
					</span>
				</div>
			) : (
				<p className="text-muted-foreground text-sm">
					No recent communications
				</p>
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
				'flex size-8 shrink-0 items-center justify-center rounded',
				config.bgColor
			)}
		>
			<IconComponent className={cn('size-4', config.textColor)} />
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

