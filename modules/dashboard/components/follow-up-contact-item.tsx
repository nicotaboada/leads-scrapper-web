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
			className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors hover:bg-accent focus:bg-accent focus:outline-none"
		>
			<Avatar className="h-10 w-10 shrink-0">
				<AvatarFallback className="bg-muted">
					{isCompany ? (
						<Building2 className="h-5 w-5 text-muted-foreground" />
					) : (
						<User className="h-5 w-5 text-muted-foreground" />
					)}
				</AvatarFallback>
			</Avatar>
			<span className="truncate text-sm font-medium">{contact.displayName}</span>
		</button>
	)
}

