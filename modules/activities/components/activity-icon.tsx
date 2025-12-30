'use client'

/**
 * Icon component for activity types
 */

import {
	ArrowRightLeft,
	CalendarCheck,
	CalendarPlus,
	Globe,
	type LucideIcon,
	Play,
	UserPlus,
	Users,
} from 'lucide-react'
import { UserActivityType } from '../types/activity'

interface ActivityIconProps {
	type: UserActivityType
	className?: string
	size?: 'xs' | 'sm' | 'md'
}

const ACTIVITY_ICONS: Record<UserActivityType, LucideIcon> = {
	[UserActivityType.CONTACT_CREATED]: UserPlus,
	[UserActivityType.RUN_CREATED]: Play,
	[UserActivityType.BULK_CONTACTS_CREATED]: Users,
	[UserActivityType.LEAD_STATUS_CHANGED]: ArrowRightLeft,
	[UserActivityType.FOLLOWUP_ADDED]: CalendarPlus,
	[UserActivityType.FOLLOWUP_COMPLETED]: CalendarCheck,
	[UserActivityType.WEBSITE_ANALYZED]: Globe,
}

const ACTIVITY_STYLES: Record<UserActivityType, { bg: string; text: string }> =
	{
		[UserActivityType.CONTACT_CREATED]: {
			bg: 'bg-zinc-900/10',
			text: 'text-zinc-900 dark:text-zinc-100',
		},
		[UserActivityType.RUN_CREATED]: {
			bg: 'bg-zinc-800/10',
			text: 'text-zinc-800 dark:text-zinc-200',
		},
		[UserActivityType.BULK_CONTACTS_CREATED]: {
			bg: 'bg-zinc-700/10',
			text: 'text-zinc-700 dark:text-zinc-300',
		},
		[UserActivityType.LEAD_STATUS_CHANGED]: {
			bg: 'bg-zinc-600/10',
			text: 'text-zinc-600 dark:text-zinc-400',
		},
		[UserActivityType.FOLLOWUP_ADDED]: {
			bg: 'bg-zinc-500/10',
			text: 'text-zinc-500 dark:text-zinc-500',
		},
		[UserActivityType.FOLLOWUP_COMPLETED]: {
			bg: 'bg-zinc-400/10',
			text: 'text-zinc-400 dark:text-zinc-600',
		},
		[UserActivityType.WEBSITE_ANALYZED]: {
			bg: 'bg-zinc-300/10',
			text: 'text-zinc-300 dark:text-zinc-700',
		},
	}

/**
 * Renders the appropriate icon for an activity type
 */
export function ActivityIcon({
	type,
	className = '',
	size = 'md',
}: ActivityIconProps) {
	const Icon = ACTIVITY_ICONS[type] ?? UserPlus
	const styles = ACTIVITY_STYLES[type] ?? {
		bg: 'bg-muted',
		text: 'text-muted-foreground',
	}

	const sizeClasses = {
		xs: 'h-4.5 w-4.5',
		sm: 'h-5.5 w-5.5',
		md: 'h-9 w-9',
	}[size]

	const iconSizeClasses = {
		xs: 'h-2.5 w-2.5',
		sm: 'h-3 w-3',
		md: 'h-4.5 w-4.5',
	}[size]

	return (
		<div
			className={`flex items-center justify-center rounded-full ${styles.bg} ${sizeClasses} ${className}`}
		>
			<Icon className={`${styles.text} ${iconSizeClasses}`} />
		</div>
	)
}
