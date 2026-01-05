'use client'

/**
 * Person Overview Tab Component
 *
 * Overview tab content for the person contact detail page.
 * Displays multiple cards with contact information in HubSpot style.
 */

import { FollowUpCard } from './follow-up-card'
import { RecentActivitiesCard } from './recent-activities-card'
import type { PersonContact } from '../types'

interface PersonOverviewTabProps {
	contact: PersonContact
	onFollowUpChanged?: () => void
}

export function PersonOverviewTab({
	contact,
	onFollowUpChanged,
}: PersonOverviewTabProps) {
	const contactName = `${contact.firstName} ${contact.lastName}`

	return (
		<div className="space-y-6">
			{/* Follow-up Card */}
			<FollowUpCard
				contactId={contact.id}
				followUp={contact.followUp}
				onFollowUpChanged={onFollowUpChanged}
			/>

			{/* Recent Activities Card */}
			<RecentActivitiesCard contactId={contact.id} contactName={contactName} />
		</div>
	)
}
