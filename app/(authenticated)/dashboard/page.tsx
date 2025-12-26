import { type Metadata } from 'next'
import { redirect } from 'next/navigation'
import { SectionHeader } from 'components/layouts/section-header'
import { getUser } from 'lib/supabase/auth'
import { FollowUpCard } from 'modules/dashboard/components/follow-up-card'
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
			<SectionHeader
				title="Dashboard"
				subtitle={`Bienvenido, ${user.email}`}
			/>

		<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{/* Leads status summary card - spans 2 columns */}
			<LeadsStatusCard />

			{/* Follow-up summary card */}
			<FollowUpCard />
		</div>

			<div className="mt-8">
				<div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
					<h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
						Información del usuario
					</h2>
					<dl className="space-y-2">
						<div>
							<dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
								Email
							</dt>
							<dd className="text-sm text-gray-900 dark:text-white">
								{user.email}
							</dd>
						</div>
						<div>
							<dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
								User ID
							</dt>
							<dd className="text-sm text-gray-900 dark:text-white">
								{user.id}
							</dd>
						</div>
					</dl>
				</div>
			</div>
		</div>
	)
}
