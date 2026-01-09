'use client'

import { Facebook, Globe, Instagram, Linkedin, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils/merge'

/**
 * Props for SocialIconsCell component
 */
interface SocialIconsCellProps {
	/** Website URL */
	website?: string | null
	/** Instagram profile URL */
	instagram?: string | null
	/** Facebook page URL */
	facebook?: string | null
	/** LinkedIn profile URL */
	linkedin?: string | null
	/** WhatsApp number or link */
	whatsapp?: string | null
}

/**
 * Props for individual social icon
 */
interface SocialIconProps {
	url: string | null | undefined
	icon: React.ComponentType<{ className?: string }>
	label: string
	enabledClassName?: string
}

/**
 * Individual social icon with enabled/disabled states
 */
function SocialIcon({
	url,
	icon: Icon,
	label,
	enabledClassName = 'text-primary',
}: SocialIconProps) {
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
					'hover:bg-accent hover:scale-110',
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
			className="text-muted-foreground/30 inline-flex cursor-default items-center justify-center rounded p-1"
			aria-label={`No ${label}`}
		>
			<Icon className="h-4 w-4" />
		</span>
	)
}

/**
 * Cell component displaying social media presence icons
 *
 * Shows 4 icons: Website, Instagram, Facebook, LinkedIn
 * - Enabled icons: full color, clickable, opens URL in new tab
 * - Disabled icons: grayed out, not clickable
 */
export function SocialIconsCell({
	website,
	instagram,
	facebook,
	linkedin,
	whatsapp,
}: SocialIconsCellProps) {
	const enabledClassName =
		'text-zinc-900 dark:text-zinc-100 hover:text-black dark:hover:text-white'

	// If whatsapp is a phone number, convert to wa.me link
	const whatsappUrl =
		whatsapp && !whatsapp.startsWith('http')
			? `https://wa.me/${whatsapp.replace(/\D/g, '')}`
			: whatsapp

	return (
		<div className="flex items-center gap-1">
			<SocialIcon
				url={website}
				icon={Globe}
				label="Website"
				enabledClassName={enabledClassName}
			/>
			<SocialIcon
				url={whatsappUrl}
				icon={MessageCircle}
				label="WhatsApp"
				enabledClassName={enabledClassName}
			/>
			<SocialIcon
				url={instagram}
				icon={Instagram}
				label="Instagram"
				enabledClassName={enabledClassName}
			/>
			<SocialIcon
				url={facebook}
				icon={Facebook}
				label="Facebook"
				enabledClassName={enabledClassName}
			/>
			<SocialIcon
				url={linkedin}
				icon={Linkedin}
				label="LinkedIn"
				enabledClassName={enabledClassName}
			/>
		</div>
	)
}
