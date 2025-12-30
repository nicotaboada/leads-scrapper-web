'use client'

/**
 * Company Overview Tab Component
 *
 * Overview tab content for the company detail page.
 * Displays multiple cards with company information in HubSpot style.
 */

import { motion } from 'motion/react'
import type { CompanyContact } from '../types'
import { AiMessageCard } from './ai-messages'
import { FollowUpCard } from './follow-up-card'
import { RecentActivitiesCard } from './recent-activities-card'

interface CompanyOverviewTabProps {
	contact: CompanyContact
	onFollowUpChanged?: () => void
	onNavigateToTab?: (tabValue: string) => void
}

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
}

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.4,
			ease: 'easeOut',
		},
	},
}

export function CompanyOverviewTab({
	contact,
	onFollowUpChanged,
	onNavigateToTab,
}: CompanyOverviewTabProps) {
	return (
		<motion.div
			className="space-y-6"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			{/* AI Message Generator Card */}
			<motion.div variants={itemVariants}>
				<AiMessageCard contact={contact} onNavigateToTab={onNavigateToTab} />
			</motion.div>

			{/* Follow-up Card */}
			<motion.div variants={itemVariants}>
				<FollowUpCard
					contactId={contact.id}
					followUp={contact.followUp}
					onFollowUpChanged={onFollowUpChanged}
				/>
			</motion.div>

			{/* Recent Activities Card */}
			<motion.div variants={itemVariants}>
				<RecentActivitiesCard contactId={contact.id} contactName={contact.companyName} />
			</motion.div>
		</motion.div>
	)
}

