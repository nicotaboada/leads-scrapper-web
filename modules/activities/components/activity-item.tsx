'use client'

/**
 * Individual activity item component
 */

import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'
import Link from 'next/link'
import { ActivityIcon } from './activity-icon'
import { UserActivity, UserActivityType } from '../types/activity'

interface ActivityItemProps {
	activity: UserActivity
	showFullName?: boolean
	showTimestamp?: boolean
	compact?: boolean
}

/**
 * Get user initials from name
 */
function getUserInitials(name: string): string {
	const parts = name.split(' ')
	if (parts.length >= 2) {
		return `${parts[0]?.[0] ?? ''}${parts[1]?.[0] ?? ''}`.toUpperCase()
	}
	return name.substring(0, 2).toUpperCase()
}

/**
 * Format relative time
 */
function formatTime(dateString: string): string {
	return formatDistanceToNow(new Date(dateString), {
		addSuffix: false,
		locale: es,
	})
}

/**
 * Render activity message with links
 */
function ActivityMessage({ activity }: { activity: UserActivity }) {
	const { type, metadata } = activity

	switch (type) {
		case UserActivityType.CONTACT_CREATED:
			return (
				<span>
					ha creado un contacto nuevo{' '}
					{metadata.contactId ? (
						<Link
							href={`/contacts/${metadata.contactId}`}
							className="font-medium text-blue-400 hover:underline"
						>
							{metadata.contactName}
						</Link>
					) : (
						<span className="font-medium">{metadata.contactName}</span>
					)}
				</span>
			)

		case UserActivityType.RUN_CREATED:
			return (
				<span>
					ha creado un nuevo run{' '}
					{metadata.runId ? (
						<Link
							href={`/runs/${metadata.runId}`}
							className="font-medium text-blue-400 hover:underline"
						>
							{metadata.runName}
						</Link>
					) : (
						<span className="font-medium">{metadata.runName}</span>
					)}
				</span>
			)

		case UserActivityType.BULK_CONTACTS_CREATED:
			return (
				<span>
					ha agregado {metadata.contactsCount} contactos a partir del run{' '}
					{metadata.runId ? (
						<Link
							href={`/runs/${metadata.runId}`}
							className="font-medium text-blue-400 hover:underline"
						>
							{metadata.runName}
						</Link>
					) : (
						<span className="font-medium">{metadata.runName}</span>
					)}
				</span>
			)

		case UserActivityType.LEAD_STATUS_CHANGED:
			return (
				<span>
					ha cambiado el estado del contacto{' '}
					{metadata.contactId ? (
						<Link
							href={`/contacts/${metadata.contactId}`}
							className="font-medium text-blue-400 hover:underline"
						>
							{metadata.contactName}
						</Link>
					) : (
						<span className="font-medium">{metadata.contactName}</span>
					)}{' '}
					de <span className="font-medium">{metadata.previousStatus}</span> a{' '}
					<span className="font-medium">{metadata.newStatus}</span>
				</span>
			)

		case UserActivityType.FOLLOWUP_ADDED:
			return (
				<span>
					ha agregado un seguimiento al contacto{' '}
					{metadata.contactId ? (
						<Link
							href={`/contacts/${metadata.contactId}`}
							className="font-medium text-blue-400 hover:underline"
						>
							{metadata.contactName}
						</Link>
					) : (
						<span className="font-medium">{metadata.contactName}</span>
					)}
				</span>
			)

		case UserActivityType.FOLLOWUP_COMPLETED:
			return (
				<span>
					ha completado el seguimiento del contacto{' '}
					{metadata.contactId ? (
						<Link
							href={`/contacts/${metadata.contactId}`}
							className="font-medium text-blue-400 hover:underline"
						>
							{metadata.contactName}
						</Link>
					) : (
						<span className="font-medium">{metadata.contactName}</span>
					)}
				</span>
			)

		case UserActivityType.WEBSITE_ANALYZED:
			return (
				<span>
					ha analizado el sitio web de{' '}
					{metadata.contactId ? (
						<Link
							href={`/contacts/${metadata.contactId}`}
							className="font-medium text-blue-400 hover:underline"
						>
							{metadata.contactName}
						</Link>
					) : (
						<span className="font-medium">{metadata.contactName}</span>
					)}
					{metadata.overallScore !== undefined && (
						<span className="text-muted-foreground ml-1">
							(Score: {metadata.overallScore})
						</span>
					)}
				</span>
			)

		default:
			return <span>ha realizado una acción</span>
	}
}

/**
 * Activity item component
 */
export function ActivityItem({
	activity,
	showFullName = true,
	showTimestamp = true,
	compact = false,
}: ActivityItemProps) {
	const initials = getUserInitials(activity.userName)
	const displayName = showFullName ? activity.userName : initials

	return (
		<div className={`flex items-center gap-2 ${compact ? 'py-2' : 'py-3'}`}>
			{/* Activity icon */}
			<div
				className={`bg-muted/50 flex flex-shrink-0 items-center justify-center rounded-full ${
					compact ? 'h-6 w-6' : 'h-8 w-8'
				}`}
			>
				<ActivityIcon type={activity.type} />
			</div>

			{/* Content */}
			<div className="min-w-0 flex-1">
				<p
					className={`text-foreground leading-snug ${compact ? 'text-xs' : 'text-sm'}`}
				>
					<span className="font-semibold">{displayName}</span>{' '}
					<ActivityMessage activity={activity} />
				</p>
			</div>

			{/* Timestamp - only shown when showTimestamp is true */}
			{showTimestamp && (
				<div className="flex-shrink-0">
					<span className="text-muted-foreground text-xs">
						{formatTime(activity.createdAt)}
					</span>
				</div>
			)}
		</div>
	)
}
