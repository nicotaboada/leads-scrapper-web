'use client'

import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface RunDetailHeaderProps {
	runName: string
	loading?: boolean
}

/**
 * Header component with breadcrumb navigation and action buttons
 */
export function RunDetailHeader({
	runName,
	loading = false,
}: RunDetailHeaderProps) {
	return (
		<div className="flex items-center justify-between pb-6">
			{/* Breadcrumb Navigation */}
			<div className="flex items-center gap-2 text-sm">
				<Link
					href="/runs"
					className="text-muted-foreground hover:text-foreground transition-colors"
				>
					Runs
				</Link>
				<ChevronRight className="text-muted-foreground h-4 w-4" />
				<span className="font-medium">{loading ? 'Loading...' : runName}</span>
			</div>

			{/* Actions Section - Placeholder for future functionality */}
			<div className="flex items-center gap-2">
				<span className="text-muted-foreground mr-2 text-sm">Acciones</span>
				<Button variant="outline" size="sm" disabled>
					Export
				</Button>
				<Button variant="outline" size="sm" disabled>
					Re-run
				</Button>
			</div>
		</div>
	)
}
