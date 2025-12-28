'use client'

/**
 * Company Overview Tab Component
 *
 * Overview tab content for the company detail page.
 * Displays multiple cards with company information in HubSpot style.
 */

import type { CompanyContact } from '../types'
import { AiMessageCard } from './ai-messages'
import { FollowUpCard } from './follow-up-card'
import { RecentActivitiesCard } from './recent-activities-card'

interface CompanyOverviewTabProps {
	contact: CompanyContact
	onFollowUpChanged?: () => void
	onNavigateToTab?: (tabValue: string) => void
}

export function CompanyOverviewTab({
	contact,
	onFollowUpChanged,
	onNavigateToTab,
}: CompanyOverviewTabProps) {
	return (
		<div className="space-y-6">
			{/* AI Message Generator Card */}
			<AiMessageCard contact={contact} onNavigateToTab={onNavigateToTab} />

			{/* Follow-up Card */}
			<FollowUpCard
				contactId={contact.id}
				followUp={contact.followUp}
				onFollowUpChanged={onFollowUpChanged}
			/>

			{/* Recent Activities Card */}
			<RecentActivitiesCard contactId={contact.id} contactName={contact.companyName} />
		</div>
	)
}

