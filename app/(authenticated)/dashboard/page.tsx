import { type Metadata } from 'next'
import { redirect } from 'next/navigation'
import { SectionHeader } from 'components/layouts/section-header'
import { getUser } from 'lib/supabase/auth'
import { ActivityCard } from 'modules/activities'
import { FollowUpCards } from 'modules/dashboard/components/follow-up-cards'
import { LeadsStatusCard } from 'modules/dashboard/components/leads-status-card'

export const metadata: Metadata = {
	title: 'Dashboard - Next.js Enterprise',
	description: 'Your personal dashboard',
}

/**
 * Dashboard page component.
 * This is a protected route that requires authentication.
 * If the user is not authenticated, they will be redirected to the login page.
 *
 * @returns The dashboard page with cards and summary widgets
 */
export default async function DashboardPage() {
	const user = await getUser()

	if (!user) {
		redirect('/login')
	}

	return (
		<div>
			<SectionHeader title="Dashboard" subtitle={`Bienvenido, ${user.email}`} />

			<div className="grid gap-6 lg:grid-cols-2">
				{/* Row 1: Leads status + Activities */}
				<LeadsStatusCard />
				<ActivityCard />

				{/* Row 2: Follow-up cards - spans full width */}
				<FollowUpCards />
			</div>
		</div>
	)
}
