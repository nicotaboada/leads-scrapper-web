'use client'

/**
 * Company Sidebar Component
 *
 * Left sidebar for the company detail page featuring:
 * - Company header with avatar and name
 * - Action buttons (WhatsApp, Email, LinkedIn, More)
 * - About this company section with company fields
 * - Read-only Lead and Tags sections
 */

import { Building2 } from 'lucide-react'
import { Avatar, AvatarFallback } from 'components/ui/avatar'
import { Separator } from 'components/ui/separator'
import { Skeleton } from 'components/ui/skeleton'
import { AboutCompanySection } from './about-company-section'
import { CompanyActionButtons } from './company-action-buttons'
import { LeadSectionReadonly } from './lead-section-readonly'
import { TagsSectionReadonly } from './tags-section-readonly'
import { FollowUpSection } from './follow-up-section'
import type { CompanyContact } from '../types'

interface CompanySidebarProps {
	contact: CompanyContact
	onEdit: () => void
	onDelete: () => void
	onFollowUpChanged?: () => void
}

/**
 * Get the initial letter of the company name for the avatar
 */
function getCompanyInitial(contact: CompanyContact): string {
	return contact.companyName.charAt(0).toUpperCase()
}

export function CompanySidebar({
	contact,
	onEdit,
	onDelete,
	onFollowUpChanged,
}: CompanySidebarProps) {
	return (
		<aside className="w-full shrink-0 lg:w-80">
			<div className="bg-card rounded-lg border p-6">
				{/* Company Header */}
				<div className="flex flex-col items-center text-center">
					<Avatar className="mb-4 size-20">
						<AvatarFallback className="bg-primary/10 text-primary text-2xl font-semibold">
							{getCompanyInitial(contact) || <Building2 className="size-8" />}
						</AvatarFallback>
					</Avatar>
					<h1 className="text-xl font-bold">{contact.companyName}</h1>
				</div>

				{/* Action Buttons */}
				<div className="mt-4 flex justify-center">
					<CompanyActionButtons
						contact={contact}
						onEdit={onEdit}
						onDelete={onDelete}
					/>
				</div>

				<Separator className="my-4" />

				{/* About Section */}
				<AboutCompanySection contact={contact} />

				<Separator className="my-4" />

				{/* Lead Section (Read-only) */}
				<LeadSectionReadonly contact={contact} />

				<Separator className="my-4" />

				{/* Follow-up Section */}
				<FollowUpSection
					contactId={contact.id}
					followUp={contact.followUp}
					onFollowUpChanged={onFollowUpChanged}
				/>

				<Separator className="my-4" />

				{/* Tags Section (Read-only) */}
				<TagsSectionReadonly tags={contact.tags} />
			</div>
		</aside>
	)
}

export function CompanySidebarSkeleton() {
	return (
		<aside className="w-full shrink-0 lg:w-80">
			<div className="bg-card rounded-lg border p-6">
				{/* Company Header Skeleton */}
				<div className="flex flex-col items-center text-center">
					<Skeleton className="mb-4 size-20 rounded-full" />
					<Skeleton className="mb-2 h-7 w-48" />
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
					<Skeleton className="mb-4 h-4 w-36" />
					<div className="space-y-4">
						<div className="flex items-start gap-3">
							<Skeleton className="mt-0.5 size-4" />
							<div className="flex-1">
								<Skeleton className="mb-1 h-3 w-20" />
								<Skeleton className="h-4 w-48" />
							</div>
						</div>
						<div className="flex items-start gap-3">
							<Skeleton className="mt-0.5 size-4" />
							<div className="flex-1">
								<Skeleton className="mb-1 h-3 w-16" />
								<Skeleton className="h-4 w-32" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</aside>
	)
}
