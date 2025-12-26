'use client'

/**
 * Lead Contact Icons Cell Component
 *
 * Displays contact icons for a lead (LinkedIn, Email, WhatsApp)
 * with enabled/disabled states based on data availability.
 */

import { Linkedin, Mail, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils/merge'
import { formatPhoneForWhatsApp } from '../types/lead'

/**
 * Props for LeadContactIconsCell component
 */
interface LeadContactIconsCellProps {
	/** LinkedIn profile URL */
	linkedinUrl?: string | null
	/** Email address */
	email?: string | null
	/** Phone/mobile number for WhatsApp */
	phone?: string | null
}

/**
 * Props for individual contact icon
 */
interface ContactIconProps {
	url: string | null | undefined
	icon: React.ComponentType<{ className?: string }>
	label: string
	enabledClassName?: string
	onClick?: () => void
}

/**
 * Individual contact icon with enabled/disabled states
 */
function ContactIcon({
	url,
	icon: Icon,
	label,
	enabledClassName = 'text-primary',
}: ContactIconProps) {
	const isEnabled = Boolean(url)

	if (isEnabled) {
		return (
			<a
				href={url!}
				target="_blank"
				rel="noopener noreferrer"
				className={cn(
					'inline-flex items-center justify-center rounded p-1',
					'cursor-pointer transition-all duration-150',
					'hover:scale-110 hover:bg-accent',
					enabledClassName
				)}
				aria-label={`Open ${label}`}
				title={url!}
			>
				<Icon className="h-4 w-4" />
			</a>
		)
	}

	return (
		<span
			className="inline-flex cursor-default items-center justify-center rounded p-1 text-muted-foreground/30"
			aria-label={`No ${label}`}
		>
			<Icon className="h-4 w-4" />
		</span>
	)
}

/**
 * Cell component displaying contact icons for a lead
 *
 * Shows 3 icons: LinkedIn, Email, WhatsApp
 * - Enabled icons: full color, clickable
 *   - LinkedIn: opens profile in new tab
 *   - Email: opens mailto: link
 *   - WhatsApp: opens wa.me link
 * - Disabled icons: grayed out, not clickable
 */
export function LeadContactIconsCell({
	linkedinUrl,
	email,
	phone,
}: LeadContactIconsCellProps) {
	// Build URLs for each contact method
	const emailUrl = email ? `mailto:${email}` : null
	const whatsappUrl = phone
		? `https://wa.me/${formatPhoneForWhatsApp(phone)}`
		: null

	return (
		<div className="flex items-center gap-1">
			<ContactIcon
				url={linkedinUrl}
				icon={Linkedin}
				label="LinkedIn"
				enabledClassName="text-sky-700 dark:text-sky-500"
			/>
			<ContactIcon
				url={emailUrl}
				icon={Mail}
				label="Email"
				enabledClassName="text-amber-600 dark:text-amber-400"
			/>
			<ContactIcon
				url={whatsappUrl}
				icon={MessageCircle}
				label="WhatsApp"
				enabledClassName="text-green-600 dark:text-green-400"
			/>
		</div>
	)
}

