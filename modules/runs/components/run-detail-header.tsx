'use client'

import { Activity } from 'lucide-react'
import { DetailHeader } from 'components/layouts/detail-header'
import { ROUTES } from 'lib/config/routes'

interface RunDetailHeaderProps {
	runName: string
	loading?: boolean
}

/**
 * Header component with breadcrumb navigation using the shared DetailHeader
 */
export function RunDetailHeader({
	runName,
	loading = false,
}: RunDetailHeaderProps) {
	return (
		<DetailHeader
			breadcrumbItems={[
				{
					label: 'Runs',
					href: ROUTES.RUNS || '/runs',
				},
				{
					icon: Activity,
					label: loading ? 'Cargando...' : runName,
				},
			]}
		/>
	)
}
