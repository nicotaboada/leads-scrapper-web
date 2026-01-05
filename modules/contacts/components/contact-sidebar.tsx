'use client'

/**
 * Contact Sidebar Component
 *
 * Left sidebar for the contact detail page featuring:
 * - Contact header with avatar and name
 * - Action buttons (WhatsApp, Email, LinkedIn, More)
 * - About this contact section with contact fields
 * - Read-only Lead and Tags sections
 */

import { Avatar, AvatarFallback } from 'components/ui/avatar'
import { Separator } from 'components/ui/separator'
import { Skeleton } from 'components/ui/skeleton'
import { AboutContactSection } from './about-contact-section'
import { ContactActionButtons } from './contact-action-buttons'
import { FollowUpSection } from './follow-up-section'
import { LeadSection } from './lead-section'
import { getPersonInitials, type PersonContact } from '../types'

interface ContactSidebarProps {
	contact: PersonContact
	onEdit: () => void
	onDelete: () => void
	onFollowUpChanged?: () => void
	onLeadChanged?: () => void
}

export function ContactSidebar({
	contact,
	onEdit,
	onDelete,
	onFollowUpChanged,
	onLeadChanged,
}: ContactSidebarProps) {
	const fullName = `${contact.firstName} ${contact.lastName}`

	return (
		<aside className="w-full shrink-0 lg:w-80">
			<div className="bg-card rounded-lg border p-6">
				{/* Contact Header */}
				<div className="flex flex-col items-center text-center">
					<Avatar className="mb-4 size-20">
						<AvatarFallback className="bg-primary/10 text-primary text-2xl font-semibold">
							{getPersonInitials(contact)}
						</AvatarFallback>
					</Avatar>
					<h1 className="text-xl font-bold">{fullName}</h1>
					{contact.jobTitle && (
						<p className="text-muted-foreground mt-1 text-sm">
							{contact.jobTitle}
						</p>
					)}
					{contact.company && (
						<p className="text-muted-foreground text-sm">
							{contact.company.companyName}
						</p>
					)}
				</div>

				{/* Action Buttons */}
				<div className="mt-4 flex justify-center">
					<ContactActionButtons
						contact={contact}
						onEdit={onEdit}
						onDelete={onDelete}
					/>
				</div>

				<Separator className="my-4" />

				{/* About Section (includes Tags) */}
				<AboutContactSection contact={contact} onEdit={onEdit} />

				<Separator className="my-4" />

				{/* Lead Section */}
				<LeadSection contact={contact} onLeadChanged={onLeadChanged} />

				<Separator className="my-4" />

				{/* Follow-up Section */}
				<FollowUpSection
					contactId={contact.id}
					followUp={contact.followUp}
					onFollowUpChanged={onFollowUpChanged}
				/>
			</div>
		</aside>
	)
}

export function ContactSidebarSkeleton() {
	return (
		<aside className="w-full shrink-0 lg:w-80">
			<div className="bg-card rounded-lg border p-6">
				{/* Contact Header Skeleton */}
				<div className="flex flex-col items-center text-center">
					<Skeleton className="mb-4 size-20 rounded-full" />
					<Skeleton className="mb-2 h-7 w-40" />
					<Skeleton className="mb-1 h-4 w-32" />
					<Skeleton className="h-4 w-28" />
				</div>

				{/* Action Buttons Skeleton */}
				<div className="mt-4 flex justify-center gap-1">
					<Skeleton className="size-9 rounded-md" />
					<Skeleton className="size-9 rounded-md" />
					<Skeleton className="size-9 rounded-md" />
					<Skeleton className="size-9 rounded-md" />
				</div>

				<Separator className="my-4" />

				{/* About Section Skeleton */}
				<div className="py-4">
					<Skeleton className="mb-4 h-4 w-32" />
					<div className="space-y-4">
						<div className="flex items-start gap-3">
							<Skeleton className="mt-0.5 size-4" />
							<div className="flex-1">
								<Skeleton className="mb-1 h-3 w-12" />
								<Skeleton className="h-4 w-40" />
							</div>
						</div>
						<div className="flex items-start gap-3">
							<Skeleton className="mt-0.5 size-4" />
							<div className="flex-1">
								<Skeleton className="mb-1 h-3 w-16" />
								<Skeleton className="h-4 w-32" />
							</div>
						</div>
						<div className="flex items-start gap-3">
							<Skeleton className="mt-0.5 size-4" />
							<div className="flex-1">
								<Skeleton className="mb-1 h-3 w-14" />
								<Skeleton className="h-4 w-36" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</aside>
	)
}
