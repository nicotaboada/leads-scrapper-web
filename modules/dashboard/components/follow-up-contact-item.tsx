'use client'

/**
 * Individual contact item for follow-up list
 */

import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback } from 'components/ui/avatar'
import { Building2, User } from 'lucide-react'
import type { ContactWithFollowUp } from '../types/follow-up'
import { ContactType } from '../types/follow-up'

interface FollowUpContactItemProps {
	contact: ContactWithFollowUp
}

/**
 * Contact item displaying avatar and name with click to navigate
 */
export function FollowUpContactItem({ contact }: FollowUpContactItemProps) {
	const router = useRouter()

	const isCompany = contact.type === ContactType.COMPANY
	const contactPath = isCompany ? 'company' : 'person'

	const handleClick = () => {
		router.push(`/contacts/${contactPath}/${contact.id}`)
	}

	return (
		<button
			type="button"
			onClick={handleClick}
			className="group flex w-full items-center gap-4 px-6 py-4 text-left transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
		>
			<div className="relative">
				<Avatar className="h-10 w-10 shrink-0 border border-zinc-100 dark:border-zinc-800 shadow-sm transition-transform group-hover:scale-105">
					<AvatarFallback className="bg-zinc-50 text-zinc-400 dark:bg-zinc-900 dark:text-zinc-500">
						{isCompany ? (
							<Building2 className="h-5 w-5" />
						) : (
							<User className="h-5 w-5" />
						)}
					</AvatarFallback>
				</Avatar>
			</div>
			<div className="flex flex-1 flex-col gap-0.5 min-w-0">
				<span className="truncate text-[13px] font-semibold text-zinc-900 dark:text-zinc-100 leading-tight">
					{contact.displayName}
				</span>
				<span className="text-[11px] text-muted-foreground/60 font-medium">
					{isCompany ? 'Empresa' : 'Persona'}
				</span>
			</div>
		</button>
	)
}

