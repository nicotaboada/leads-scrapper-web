'use client'

/**
 * Company Overview Tab Component
 *
 * Overview tab content for the company detail page.
 * Displays multiple cards with company information in HubSpot style.
 */

import type { CompanyContact } from '../types'
import { RecentActivitiesCard } from './recent-activities-card'
import { FollowUpCard } from './follow-up-card'

interface CompanyOverviewTabProps {
	contact: CompanyContact
	onFollowUpChanged?: () => void
}

export function CompanyOverviewTab({ contact, onFollowUpChanged }: CompanyOverviewTabProps) {
	return (
		<div className="space-y-6">
			{/* Follow-up Card */}
			<FollowUpCard
				contactId={contact.id}
				followUp={contact.followUp}
				onFollowUpChanged={onFollowUpChanged}
			/>

			{/* Recent Activities Card */}
			<RecentActivitiesCard
				contactId={contact.id}
				contactName={contact.companyName}
			/>
		</div>
	)
}

