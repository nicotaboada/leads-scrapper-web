'use client'

/**
 * Individual activity item component
 */

import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'
import Link from 'next/link'
import { ActivityIcon } from './activity-icon'
import { UserActivity, UserActivityType } from '../types/activity'
import { Avatar, AvatarFallback } from 'components/ui/avatar'
import { cn } from 'lib/utils/merge'

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
		addSuffix: true,
		locale: es,
	})
}

const LINK_CLASSES = "font-medium text-foreground hover:underline decoration-muted-foreground/50 underline-offset-4 transition-colors"

/**
 * Render activity message with links
 */
function ActivityMessage({ activity }: { activity: UserActivity }) {
	const { type, metadata } = activity

	switch (type) {
		case UserActivityType.CONTACT_CREATED:
			return (
				<span className="text-muted-foreground">
					ha creado un contacto nuevo{' '}
					{metadata.contactId ? (
						<Link
							href={`/contacts/${metadata.contactId}`}
							className={LINK_CLASSES}
						>
							{metadata.contactName}
						</Link>
					) : (
						<span className="font-medium text-foreground">{metadata.contactName}</span>
					)}
				</span>
			)

		case UserActivityType.RUN_CREATED:
			return (
				<span className="text-muted-foreground">
					ha creado un nuevo run{' '}
					{metadata.runId ? (
						<Link
							href={`/runs/${metadata.runId}`}
							className={LINK_CLASSES}
						>
							{metadata.runName}
						</Link>
					) : (
						<span className="font-medium text-foreground">{metadata.runName}</span>
					)}
				</span>
			)

		case UserActivityType.BULK_CONTACTS_CREATED:
			return (
				<span className="text-muted-foreground">
					ha agregado <span className="text-foreground font-medium">{metadata.contactsCount}</span> contactos a partir del run{' '}
					{metadata.runId ? (
						<Link
							href={`/runs/${metadata.runId}`}
							className={LINK_CLASSES}
						>
							{metadata.runName}
						</Link>
					) : (
						<span className="font-medium text-foreground">{metadata.runName}</span>
					)}
				</span>
			)

		case UserActivityType.LEAD_STATUS_CHANGED:
			return (
				<span className="text-muted-foreground">
					ha cambiado el estado del contacto{' '}
					{metadata.contactId ? (
						<Link
							href={`/contacts/${metadata.contactId}`}
							className={LINK_CLASSES}
						>
							{metadata.contactName}
						</Link>
					) : (
						<span className="font-medium text-foreground">{metadata.contactName}</span>
					)}{' '}
					de <span className="font-medium text-foreground">{metadata.previousStatus}</span> a{' '}
					<span className="font-medium text-foreground">{metadata.newStatus}</span>
				</span>
			)

		case UserActivityType.FOLLOWUP_ADDED:
			return (
				<span className="text-muted-foreground">
					ha agregado un seguimiento al contacto{' '}
					{metadata.contactId ? (
						<Link
							href={`/contacts/${metadata.contactId}`}
							className={LINK_CLASSES}
						>
							{metadata.contactName}
						</Link>
					) : (
						<span className="font-medium text-foreground">{metadata.contactName}</span>
					)}
				</span>
			)

		case UserActivityType.FOLLOWUP_COMPLETED:
			return (
				<span className="text-muted-foreground">
					ha completado el seguimiento del contacto{' '}
					{metadata.contactId ? (
						<Link
							href={`/contacts/${metadata.contactId}`}
							className={LINK_CLASSES}
						>
							{metadata.contactName}
						</Link>
					) : (
						<span className="font-medium text-foreground">{metadata.contactName}</span>
					)}
				</span>
			)

		case UserActivityType.WEBSITE_ANALYZED:
			return (
				<span className="text-muted-foreground">
					ha analizado el sitio web de{' '}
					{metadata.contactId ? (
						<Link
							href={`/contacts/${metadata.contactId}`}
							className={LINK_CLASSES}
						>
							{metadata.contactName}
						</Link>
					) : (
						<span className="font-medium text-foreground">{metadata.contactName}</span>
					)}
					{metadata.overallScore !== undefined && (
						<span className="ml-1.5 inline-flex items-center rounded-md bg-zinc-100 px-1.5 py-0.5 text-[10px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
							Score: {metadata.overallScore}
						</span>
					)}
				</span>
			)

		default:
			return <span className="text-muted-foreground">ha realizado una acción</span>
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
		<div className={cn(
			"group relative flex items-start gap-4 transition-colors hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50",
			compact ? "py-3 px-6" : "py-4 px-4"
		)}>
			{/* Activity icon overlaying the avatar or beside it */}
			<div className="relative flex-shrink-0">
				<Avatar className={cn(
					"border border-border",
					compact ? "h-8 w-8" : "h-10 w-10"
				)}>
					<AvatarFallback className="bg-zinc-100 text-[10px] font-semibold text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
						{initials}
					</AvatarFallback>
				</Avatar>
				
				<div className="absolute -bottom-1 -right-1">
					<ActivityIcon 
						type={activity.type} 
						size={compact ? "xs" : "sm"}
						className="border-2 border-background shadow-sm"
					/>
				</div>
			</div>

			{/* Content */}
			<div className="min-w-0 flex-1 pt-0.5">
				<div className="flex flex-col gap-0.5">
					<p className={cn(
						"text-foreground leading-normal",
						compact ? "text-[13px]" : "text-sm"
					)}>
						<span className="font-semibold text-zinc-900 dark:text-zinc-100">
							{displayName}
						</span>{' '}
						<ActivityMessage activity={activity} />
					</p>
					
					{showTimestamp && (
						<span className="text-[11px] text-muted-foreground/70">
							{formatTime(activity.createdAt)}
						</span>
					)}
				</div>
			</div>
		</div>
	)
}
